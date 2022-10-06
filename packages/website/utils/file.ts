import { isEmpty } from "@chakra-ui/utils";
import Compressor from "compressorjs";
import { v4 } from "uuid";

import { ImageType, OwnerType, UploadStatus } from "@/constant";

import {
  createObjectUploads,
  UploadPayloadRequest,
  UploadPresignedObject,
} from "@/net/http/gateway";

import { isNotEmpty } from "./is";

const cachedUplodedImages = new Map<string, string>();

export type PicBaseInfo = {
  uuid: string;
  type: string;
  size: number;
  width: number;
  height: number;
  url: string;
};

// eslint-disable-next-line max-params
export async function uploadFile(
  files: FileList | File[],
  type: ImageType,
  ownerId: string,
  ownerType: OwnerType,
  statusCallback?: (index: number, status: number) => void,
  indexOffset = 0
) {
  const results = await uploadFiles(files, {
    type,
    ownerId,
    ownerType,
    statusCallback,
    indexOffset,
  });

  return results
    ?.map((val) => {
      return val?.uploadedUrl;
    })
    .filter((e) => {
      // filter nonull file url
      return !e;
    });
}

interface UploadFileOptions {
  type: ImageType;
  ownerId: string;
  ownerType: OwnerType;
  statusCallback?: (index: number, status: UploadStatus) => void;
  indexOffset?: number;
}

type uploadFileRequestType = {
  file?: File;
  cached?: boolean;
  localPath?: string;
  uploadedUrl?: string;
};

/**
 * Batch upload files.
 *
 * If one file upload failed, its url will be undefined
 */
export async function uploadFiles(
  files: FileList | File[],
  options: UploadFileOptions
): Promise<uploadFileRequestType[] | undefined> {
  const _indexOffset = options.indexOffset ?? 0;
  const _statusCallback = (index: number, status: UploadStatus) => {
    options.statusCallback?.(index + _indexOffset, status);
  };

  const cFileArray = Array.from(files).map((val) => {
    if (val.type.toLocaleLowerCase() === "gif") {
      return Promise.resolve(val);
    } else {
      const comImage = new Promise((resolve) => {
        new Compressor(val, {
          quality: 0.6,
          maxWidth: Infinity,
          maxHeight: Infinity,
          success: (result: File) => {
            resolve(result);
          },
          error: () => {
            resolve(val);
          },
        });
      }) as Promise<File>;

      return comImage;
    }
  });

  const filesArray: File[] = await Promise.all(cFileArray);
  const needUploadedFilesIndexs: number[] = [];
  const needUploadedFilesRequestPayloads: UploadPayloadRequest[] = [];
  const tempFiles = filesArray.map((file, index) => {
    const currentFilePath = getLocalFilePath(file);
    const cachedFileUrl = cachedUplodedImages.get(currentFilePath);
    const cached = isNotEmpty(cachedFileUrl);
    if (cached) {
      // callback upload successed
      _statusCallback(index, UploadStatus.uploadSuccess);
    } else {
      // need to upload
      needUploadedFilesIndexs.push(index);
      needUploadedFilesRequestPayloads.push({
        index: needUploadedFilesRequestPayloads.length,
        type: options.type,
        contentType: file.type,
        contentLength: file.size,
        ownerId: options.ownerId,
        ownerType: options.ownerType,
      });
      // callback start upload
      _statusCallback(index, UploadStatus.start);
    }

    return {
      file,
      cached,
      localPath: currentFilePath,
      uploadedUrl: cachedFileUrl,
    };
  });

  if (isEmpty(needUploadedFilesRequestPayloads)) {
    // all files cached
    return tempFiles.map((e) => {
      return { uploadedUrl: e.uploadedUrl! };
    });
  }
  const result = await createObjectUploads({
    payloads: needUploadedFilesRequestPayloads,
  });

  const fileUploadUrls: UploadPresignedObject[] | undefined =
    result?.data?.objects;

  if (result.code || !fileUploadUrls) {
    needUploadedFilesIndexs.forEach((index) => {
      // callback upload failed
      _statusCallback(index, UploadStatus.uploadFail);
    });

    // all need upload files upload failed
    return undefined;
  }

  const uploadTasks = fileUploadUrls.map((uploadUrl, index) => {
    const reqHeader = {};
    uploadUrl.headers.forEach((header) => {
      reqHeader[header.key] = header.value;
    });

    return fetch(uploadUrl.urls, {
      method: "PUT",
      headers: reqHeader,
      body: tempFiles[needUploadedFilesIndexs[index]].file,
    }).catch(() => {
      return undefined;
    });
  });

  const results = await Promise.all(uploadTasks);

  results.forEach((response, index) => {
    const fileIdx = needUploadedFilesIndexs[index];
    if (response?.status !== 200) {
      // callback file upload failed
      _statusCallback(fileIdx, UploadStatus.uploadFail);
    } else {
      const url = new URL(response.url).pathname;
      tempFiles[fileIdx].uploadedUrl = url;
      // callback file upload successed
      _statusCallback(index, UploadStatus.uploadSuccess);
      // cache uploaded file url
      cachedUplodedImages.set(tempFiles[fileIdx].localPath, url);
    }
  });

  return tempFiles;
}

export async function uploadImage(
  file: File,
  options: UploadFileOptions,
  compress = true
) {
  let processedFile = file;
  if (compress) {
    processedFile = await new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.6,
        maxWidth: Infinity,
        maxHeight: Infinity,
        success: (result: File) => {
          resolve(result);
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  const currentFilePath = getLocalFilePath(processedFile);
  const cachedFileUrl = cachedUplodedImages.get(currentFilePath);
  const cached = isNotEmpty(cachedFileUrl);
  if (cached) {
    return cachedFileUrl;
  }
  const result = await createObjectUploads({
    payloads: [
      {
        index: 0,
        type: options.type,
        contentType: processedFile.type,
        contentLength: processedFile.size,
        ownerId: options.ownerId,
        ownerType: options.ownerType,
      },
    ],
  });

  const uploadUrl: UploadPresignedObject | undefined =
    result?.data?.objects?.[0];

  if (result.code || !uploadUrl) {
    return undefined;
  }

  const reqHeader = {};
  uploadUrl.headers.forEach((header) => {
    reqHeader[header.key] = header.value;
  });

  const response = await fetch(uploadUrl.urls, {
    method: "PUT",
    headers: reqHeader,
    body: processedFile,
  }).catch(() => {
    return undefined;
  });

  if (response?.status !== 200) {
    return undefined;
  } else {
    const url = new URL(response.url).pathname;
    // cache uploaded file url
    cachedUplodedImages.set(currentFilePath, url);

    return url;
  }
}

export const getLocalFilePath = (file: File) => {
  const _URL = window.URL || window.webkitURL;
  const localPath = _URL.createObjectURL(file);
  // ? when to revoke
  // _URL.revokeObjectURL(localPath);

  return localPath;
};

export const getImageInfo = (file: File): Promise<PicBaseInfo> => {
  return new Promise((resolve) => {
    const uuid = v4();
    const imgURL = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({
        uuid,
        type: file.type,
        size: file.size,
        width: img.width,
        height: img.height,
        url: imgURL,
      });
    };
    img.src = imgURL;
  });
};
export const getMultipleWidthAndHeight = (width: number, height: number) => {
  const maxW = 400;
  const maxH = 400;
  const standRatio = maxW / maxH,
    ratio = Math.fround(width / height);
  const appendPx = (lengths: { width: number; height: number }) => {
    return {
      width: `${Math.ceil(lengths.width)}px`,
      height: `${Math.ceil(lengths.height)}px`,
    };
  };
  if (height < maxH && width < maxW) {
    return appendPx({ width, height });
  }
  if (height >= maxH && width >= maxW) {
    if (ratio >= standRatio) {
      return appendPx({ width: maxW, height: maxW / ratio });
    } else {
      return appendPx({ height: maxH, width: maxH * ratio });
    }
  }
  if (height >= maxH) {
    return appendPx({ height: maxH, width: maxH * ratio });
  }
  if (width >= maxW) {
    return appendPx({ width: maxW, height: maxW / ratio });
  }

  return appendPx({ width, height });
};

export const getSnapshotUrl = (sourceUrl: string) => {
  const fileTypes = [
    "bmp",
    "jpg",
    "png",
    "tif",
    "gif",
    "pcx",
    "tga",
    "exif",
    "fpx",
    "svg",
    "psd",
    "cdr",
    "pcd",
    "dxf",
    "ufo",
    "eps",
    "ai",
    "raw",
    "WMF",
    "webp",
    "avif",
    "apng",
  ];
  const snapShotMark = "_thumbnail.";
  const slice = sourceUrl.split(".");
  if (slice.length <= 1) {
    return sourceUrl;
  } else {
    const fileType = slice.pop() ?? "";
    if (fileTypes.includes(fileType)) {
      return slice.join(".") + snapShotMark + fileType;
    } else {
      return sourceUrl;
    }
  }
};
