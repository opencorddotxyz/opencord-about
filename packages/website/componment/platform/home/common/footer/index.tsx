import { isDesktop, vwPX } from "@/utils";
import { Box, Text, Flex, Link } from "@chakra-ui/react";
import { useIsPC } from "../../../../../hooks/useIsPC";
import { kDomains, vw } from "../../../../../utils";

const NavigationItem = (props: {
  text: string;
  onClick?: () => void;
  url?: string;
  download?: boolean;
  disable?: boolean;
  isExternal?: boolean;
}) => {
  const {
    text = "",
    onClick,
    url,
    download = false,
    disable = false,
    isExternal = true,
  } = props;
  const isPC = useIsPC();
  const innerText = (
    <Text
      onClick={() => {
        onClick?.();
      }}
      fontWeight="400"
      fontSize={!isPC ? vw(24) : vwPX(13)}
      lineHeight={!isPC ? vw(30) : vwPX(16)}
      color="#000000"
      textAlign="left"
      marginTop={!isPC ? vw(20) : vwPX(20)}
      opacity={0.7}
      _hover={{
        textDecoration: "none",
      }}
      cursor={disable ? "not-allowed" : "pointer"}
    >
      {text}
    </Text>
  );
  return url ? (
    <Link
      isExternal={isExternal}
      href={url}
      download={download}
      _hover={{
        textDecoration: "none",
      }}
    >
      {innerText}
    </Link>
  ) : (
    innerText
  );
};

export const Download = () => {
  const isPC = useIsPC();
  return (
    <Box fontWeight="400" color="#000000" textAlign="left">
      <Text
        fontWeight="600"
        fontSize={!isPC ? vw(24) : vwPX(14)}
        lineHeight={!isPC ? vw(30) : vwPX(18)}
      >
        Download
      </Text>
      <Flex align="center">
        <Link
          isExternal
          href="https://apps.apple.com/us/app/opencord-web3-social-platform/id1644330349"
          _hover={{
            textDecoration: "none",
          }}
        >
          <NavigationItem text="iOS" />
        </Link>
      </Flex>
      <Flex align="center">
        <NavigationItem text="Android" />
        <Text
          fontWeight="400"
          fontSize={!isPC ? vw(18) : vwPX(10)}
          lineHeight={!isPC ? vw(23) : vwPX(13)}
          opacity={0.3}
          marginTop={!isPC ? vw(20) : vwPX(20)}
        >
          &nbsp; (coming soon)
        </Text>
      </Flex>

      {/* {isDesktop() ? <NavigationItem text="Web" url={kDomains.app} /> : <Box />} */}
    </Box>
  );
};

export const Resources = () => {
  const isPC = useIsPC();
  return (
    <Box fontWeight="400" color="#000000" textAlign="left">
      <Text
        fontWeight="600"
        fontSize={!isPC ? vw(24) : vwPX(14)}
        lineHeight={!isPC ? vw(30) : vwPX(18)}
      >
        Resources
      </Text>
      <NavigationItem text="Terms" url={kDomains.www + "/terms"} />
      <NavigationItem text="Privacy" url={kDomains.www + "/privacy"} />
      <NavigationItem
        text="Brand Assets"
        url="/Opencord_brand_assets.zip"
        download
      />
    </Box>
  );
};

export const Community = () => {
  const isPC = useIsPC();
  return (
    <Box fontWeight="400" color="#000000" textAlign="left">
      <Text
        fontWeight="600"
        fontSize={!isPC ? vw(24) : vwPX(14)}
        lineHeight={!isPC ? vw(30) : vwPX(18)}
      >
        Contact Us
      </Text>
      <NavigationItem text="Twitter" url="https://twitter.com/opencorddotxyz" />
      <NavigationItem text="Email" url="mailto:team@opencord.xyz" />
    </Box>
  );
};
