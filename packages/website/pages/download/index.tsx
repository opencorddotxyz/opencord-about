import dynamic from "next/dynamic";
import { isDesktop } from "@/utils";
import { Box } from "@chakra-ui/react";

const _DownloadPage = dynamic(
  () => {
    return isDesktop()
      ? import("@/componment/platform/download/pc")
      : import("@/componment/platform/download/mobile");
  },
  {
    ssr: false,
  }
);

const DownloadPage = () => {
  return (
    <Box bg="#000">
      <_DownloadPage />
    </Box>
  );
};

export default DownloadPage;
