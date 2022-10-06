import { Box, BoxProps, Input, InputProps } from '@chakra-ui/react';
import { useRef } from 'react';

interface ISelectFile extends Pick<BoxProps, 'children'> {
  fileProps?: Pick<InputProps, 'accept' | 'multiple'>;
  selectChange: (files: FileList | null) => void;
  boxProps?: Omit<BoxProps, 'children'>;
}

interface IImagePicker extends BoxProps {
  accept?: string;
  multiple?: boolean;
  onSelectImages: (files: File[]) => void;
}

export const ImagePicker = (props: IImagePicker) => {
  const {
    children,
    accept = '.png, .jpg, .jpeg, .gif',
    multiple = true,
    onSelectImages,
    ...rest
  } = props;

  return (
    <SelectFile
      fileProps={{
        accept,
        multiple,
      }}
      selectChange={(e) => {
        onSelectImages(e ? Array.from(e) : []);
      }}
      boxProps={rest}
    >
      {children}
    </SelectFile>
  );
};

export const SelectFile = (props: ISelectFile) => {
  const { boxProps, selectChange, fileProps } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Box
      padding={'0px'}
      position={'relative'}
      {...boxProps}
      _hover={{
        '& .SelectPickerIcon': {
          backgroundImage: '/imgs/main/add.svg',
        },
      }}
    >
      <Input
        type={'file'}
        width={'100%'}
        height={'100%'}
        position={'absolute'}
        opacity={0}
        zIndex={10}
        ref={inputRef}
        onChange={(e) => {
          selectChange(e.target.files);
          if (inputRef.current !== null) {
            inputRef.current.value = '';
          }
        }}
        bg="transparent"
        {...fileProps}
      />
      {props.children}
    </Box>
  );
};
