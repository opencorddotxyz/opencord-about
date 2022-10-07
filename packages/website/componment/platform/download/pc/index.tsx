import {
  Box,
  Center,
  Link,
  Image,
  Flex,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useToast,
  useDisclosure,
  PopoverBody,
} from "@chakra-ui/react";
import { vw, vwPX } from "@/utils";
import { TextToast } from "@/componment";

import { Title } from "../../home/pc/first";
import { Navigation } from "../../home/pc/footer";
import { Box_shadow } from "@/constant/style";
import { APPLE_STORE } from "@/constant/constant";
import { useDebounceFn } from "ahooks";

const DownloadPage = () => {
  return (
    <>
      <Title />
      <Box
        backgroundImage="/imgs/download/download_bg_pc.svg"
        width="100vw"
        height="100vh"
        overflowX="hidden"
        backgroundSize="cover"
      >
        <Center h="100vh" flexDir={"column"}>
          <Text
            color="white"
            fontWeight={700}
            fontSize="62px"
            lineHeight={"78px"}
            textAlign="center"
          >
            The Web 3.0 Scoical Platform
            <br />
            Built For DAOs
          </Text>
          <Text
            mt="40px"
            fontWeight={500}
            color="rgba(255,255,255,0.7)"
            fontSize="16px"
            lineHeight={"20px"}
            textAlign="center"
          >
            We are on the mission to be the open cord for connections and build
            it together with DAO friends
            <br />
            who are looking for the perfect Web3 homebase for DAOs.
          </Text>
          <Box mt="40px">
            <DownloadStore isMobile={false} height={40} />
          </Box>
        </Center>
        <Box bg="white">
          <Box height={vwPX(50)} />
          <Navigation />
          <Box height={vwPX(30)} />
        </Box>
      </Box>
    </>
  );
};
export default DownloadPage;

export const DownloadStore = (props: {
  isMobile: boolean;
  needQr?: boolean;
  height?: number;
}) => {
  const toast = useToast();
  const { needQr = true, height = 100, isMobile } = props;
  const _height = isMobile ? vw(height) : `${height}px`;
  const _margin = isMobile ? vw(height / 10) : `${height / 10}px`;
  const jumpGoogleStore = () => {
    toast({
      position: "top",
      render: () => {
        return <TextToast text={"coming soon"} />;
      },
    });
  };
  const { run: debouncedJump } = useDebounceFn(jumpGoogleStore, { wait: 300 });
  const { isOpen, onToggle, onClose } = useDisclosure();
  console.log("==> ", _height);

  return (
    <Flex h={_height} w="auto" userSelect={"none"}>
      <Box h="100%">
        <Link isExternal href={APPLE_STORE}>
          <Image
            h="100%"
            src="/imgs/icon/apple_store.svg"
            alt="apple store"
            cursor={"pointer"}
            _hover={{
              boxShadow: Box_shadow,
            }}
          />
        </Link>
      </Box>
      <Box h="100%" ml={_margin} onClick={debouncedJump}>
        <Image
          h="100%"
          src="/imgs/icon/google_store.svg"
          alt="google store"
          cursor={"pointer"}
          _hover={{
            boxShadow: Box_shadow,
          }}
        />
      </Box>
      {needQr && (
        <Box h="100%" ml={_margin}>
          <Popover
            placement="bottom-end"
            isLazy
            isOpen={isOpen}
            onClose={onClose}
          >
            <PopoverTrigger>
              <Image
                src="/imgs/icon/icon_qr_preview.svg"
                alt="google store"
                cursor={"pointer"}
                _hover={{
                  boxShadow: Box_shadow,
                }}
                onMouseEnter={onToggle}
                onMouseLeave={onClose}
              />
            </PopoverTrigger>
            <PopoverContent
              w="115px"
              h="140px"
              borderRadius="4px"
              border="none"
              boxShadow={Box_shadow}
            >
              <PopoverBody padding="10px">
                <Center h="70%" textAlign="center">
                  <Image
                    src="/imgs/download/download_qr.svg"
                    alt="download page"
                  />
                </Center>
                <Text
                  fontSize="12px"
                  fontWeight="400"
                  lineHeight="15px"
                  textAlign="center"
                >
                  Scan QR code to
                  <br /> download
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </Flex>
  );
};
