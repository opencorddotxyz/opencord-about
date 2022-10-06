import { Box } from "@chakra-ui/react";
import { BannerMobile } from "./banner";
import { Detail } from "./detail";
import { First } from "./first";
import { FooterMobile } from "./footer";
import { NavigationMobile } from "./navigation";
const HomePageMobile = () => {
  return (
    <Box bg="#000">
      <First />
      <Detail />
      <FooterMobile />
      <BannerMobile />
      <NavigationMobile />
    </Box>
  );
};
export default HomePageMobile;
