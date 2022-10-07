import { Box, Center, CircularProgress, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import { ImageType, OwnerType, UploadStatus } from "@/constant";
import { CommonImage } from "@/net/http/gatewayComponents";

import { getImageInfo, uploadFiles, vw } from "@/utils";
import { SelectFile } from "./file";

const ImagesList = (
  props: {
    images: CommonImage[];
    updateUploadLoading: (loading: boolean) => void;
  },
  ref
) => {
  const router = useRouter();
  const { serverId = "" } = router.query;
  const { images = [], updateUploadLoading } = props;

  const propsImagesUrls = images.map((val) => {
    return val.url;
  });

  const isFirstRef = useRef(true);
  const [uploadStatus, setUploadStatus] = useState<number[]>([]);

  const [localImages, setLocalImages] = useState<string[]>([]);

  useEffect(() => {
    if (!isFirstRef.current) {
      return;
    }

    const currentImagesStatus = images.map(() => {
      return UploadStatus.uploadSuccess;
    });

    setUploadStatus(currentImagesStatus);
    ref.current = images;

    isFirstRef.current = false;
  }, [images, propsImagesUrls, ref]);

  const updateUploadStatus = (index: number, status: number) => {
    setUploadStatus((pre) => {
      pre[index] = status;

      return [...pre];
    });
  };

  const deleteImageByIndex = (index: number) => {
    const newImages = [...localImages];
    newImages.splice(index, 1);
    setLocalImages(newImages);

    if (ref.current) {
      const oldImages = [...ref.current];

      oldImages?.splice(index, 1);
      ref.current = oldImages;
    }
  };

  return (
    <Box width="100%">
      <Flex>
        {localImages?.map((image, index) => {
          return (
            <ImageItem
              key={image}
              image={image}
              status={uploadStatus[index]}
              deleteImage={deleteImageByIndex}
              position={index}
            />
          );
        })}

        {(localImages?.length ?? 0) < 4 ? (
          <SelectFile
            fileProps={{
              multiple: true,
              accept: "image/png,image/jpg,image/jpeg,image/gif",
            }}
            selectChange={async (files) => {
              const currentTopicImageCount = localImages?.length ?? 0;
              if (currentTopicImageCount >= 4) {
                return;
              }
              if (files === null) {
                return;
              }

              const userSelectImageCount = files.length;
              const willAddImageCount = 4 - currentTopicImageCount;
              const newFiles: File[] = [];

              const finalCount =
                userSelectImageCount > willAddImageCount
                  ? willAddImageCount
                  : userSelectImageCount;

              const uploadLocalImages = [...localImages];

              for (let i = 0; i < finalCount; i++) {
                const currentFile = files.item(i);
                if (currentFile !== null) {
                  newFiles.push(currentFile);
                  uploadLocalImages.push(URL.createObjectURL(currentFile));
                }
              }

              setLocalImages(uploadLocalImages);

              updateUploadLoading(true);
              const uploadImage = await uploadFiles(newFiles, {
                ownerId: serverId as string,
                type: ImageType.ATTACHMENT,
                ownerType: OwnerType.SERVER,
                statusCallback: updateUploadStatus,
                indexOffset: localImages?.length ?? 0,
              });

              const imagesWithWidthAndHeight: CommonImage[] = [];

              if (uploadImage === undefined) {
                return;
              }

              for (let i = 0; i < uploadImage?.length ?? 0; i++) {
                const currentImage = uploadImage[i];
                if (
                  currentImage === undefined ||
                  currentImage.file === undefined
                ) {
                  continue;
                }
                const currentFile = await getImageInfo(currentImage?.file);
                imagesWithWidthAndHeight.push({
                  url: currentImage?.uploadedUrl ?? "",
                  height: currentFile.height.toString(),
                  width: currentFile.width.toString(),
                });
              }

              ref.current = [
                ...(ref?.current ?? []),
                ...imagesWithWidthAndHeight,
              ];
              updateUploadLoading(false);
            }}
          >
            <AddImages />
          </SelectFile>
        ) : (
          <Box />
        )}
      </Flex>
    </Box>
  );
};

export default React.forwardRef(ImagesList);

const AddImages = () => {
  return (
    <Box
      width={vw(96)}
      height={vw(96)}
      borderRadius={"4px"}
      bg="#313131"
      paddingY={vw(34)}
    >
      <Center>
        <Image
          src="/imgs/add/add.svg"
          width={vw(28)}
          height={vw(28)}
          alt="add"
        />
      </Center>
    </Box>
  );
};

const ImageItem = (props: {
  image: string;
  status: number;
  deleteImage: (index: number) => void;
  position: number;
}) => {
  const { image, status, deleteImage, position } = props;

  return (
    <Box
      width={vw(96)}
      height={vw(96)}
      borderRadius={"4px"}
      overflow="visible"
      marginRight={vw(18)}
      bgPos="center"
      position="relative"
    >
      <Image
        position={"absolute"}
        bg="rgb(15,15,15)"
        width={vw(96)}
        height={vw(96)}
        src={image}
        objectFit="cover"
        alt="imageItem"
        borderRadius={"4px"}
      />

      {status === UploadStatus.start ? (
        <Box
          position={"absolute"}
          width={vw(96)}
          height={vw(96)}
          bg="#000000"
          opacity={0.7}
          zIndex={10}
          top="0"
          paddingY={vw(38)}
        >
          <Center>
            <CircularProgress
              isIndeterminate
              size={vw(20)}
              color="#282828"
              trackColor="#FFFFFF"
            />
          </Center>
        </Box>
      ) : (
        <Box />
      )}
      <Image
        width={vw(36)}
        height={vw(36)}
        zIndex={10}
        fit="cover"
        borderRadius={"4px"}
        top={`-${vw(18)}`}
        right={`-${vw(18)}`}
        position={"absolute"}
        src="/imgs/close/delete.svg"
        onClick={() => {
          deleteImage(position);
        }}
        alt="delete_image"
      />
    </Box>
  );
};
