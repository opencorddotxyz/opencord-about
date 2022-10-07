import dynamic from "next/dynamic";
import { isDesktop } from "@/utils";
import { Box } from "@chakra-ui/react";

const WaitPage = dynamic(
  () => {
    return isDesktop()
      ? import("@/componment/platform/waitlist/pc")
      : import("@/componment/platform/waitlist/mobile");
  },
  {
    ssr: false,
  }
);

const WaitListPage = () => {
  return (
    <Box bg="#000">
      <WaitPage />
    </Box>
  );
};

export default WaitListPage;
