import { Box } from "@chakra-ui/react";
import { FirstPage } from "./first";
import { Footer } from "./footer";
import { SecondPage } from "./second";

import Visualizer from "./visualizer";
import Power from "./power";
import Management from "./flow_line";

const HomePagePc = () => {
  return (
    <Box w="100%" position="relative" bg="#000000">
      <FirstPage />
      <SecondPage />
      <Box overflowX="hidden">
        <Management />
        <Box h="80px" />
        <Power />
        <Box h="80px" />
        <Visualizer />
        <Box h="120px" />
        <Footer />
      </Box>
    </Box>
  );
};
export default HomePagePc;
