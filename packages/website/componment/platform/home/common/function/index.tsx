import {
  Box,
  Center,
  Image,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { useIsPC } from "../../../../../hooks/useIsPC";
import { vw, vwPX } from "../../../../../utils/vw";

export const Web3Item = () => {
  return (
    <FunctionItem
      src="/imgs/main/web3.png"
      title="Web3"
      subtitle="Bringing your own identity, data and reputation."
    />
  );
};

export const DAOItem = () => {
  return (
    <FunctionItem
      src="/imgs/main/dao.png"
      title="DAO"
      subtitle="Opencord is built for DAOs and building together with DAO friends. "
    />
  );
};

export const SmoothItem = () => {
  return (
    <FunctionItem
      src="/imgs/main/smooth.png"
      title="Smooth"
      subtitle="Seamlessly switch between chat, voice, discussion, and Dapps."
    />
  );
};
export const GovernanceItem = () => {
  return (
    <FunctionItem
      src="/imgs/main/governance.png"
      title="Governance"
      subtitle="Discuss, propose and vote in one place."
    />
  );
};

export const ExtensibleItem = () => {
  return (
    <FunctionItem
      src="/imgs/main/extensible.png"
      title="Extensible"
      subtitle="Interact directly with Dapps and DAO tools."
    />
  );
};

export const OpenItem = () => {
  return (
    <FunctionItem
      src="/imgs/main/open.png"
      title="Open"
      subtitle="Opencord has an open plugin system and source code free for everyone."
    />
  );
};

export const FunctionItem = (props: {
  src: string;
  title: string;
  subtitle: string;
  textProps?: TextProps;
  subTitleProps?: TextProps;
}) => {
  const { src, title, subtitle, textProps, subTitleProps } = props;
  const isPC = useIsPC();
  const isMobile = !isPC;
  const imageSize = isMobile ? vw(100) : vwPX(80);
  const width = isMobile ? vw(300) : vwPX(250);
  return (
    <Box width={width} height="100%" padding="0">
      <Center>
        <Image
          alt=""
          src={src}
          height={imageSize}
          width={imageSize}
          objectFit="cover"
        />
      </Center>
      <Box height={isMobile ? vw(20) : vwPX(20)} />
      <Text
        fontWeight="700"
        fontSize={isMobile ? vw(32) : vwPX(22)}
        lineHeight={isMobile ? vw(32) : vwPX(28)}
        color="#000000"
        textAlign="center"
        {...textProps}
      >
        {title}
      </Text>
      <Box height={isMobile ? vw(10) : vwPX(10)} />
      <Text
        fontWeight="500"
        fontSize={isMobile ? vw(24) : vwPX(16)}
        lineHeight={isMobile ? vw(30) : vwPX(20)}
        color="#000000"
        opacity={0.5}
        textAlign="center"
        {...subTitleProps}
      >
        {subtitle}
      </Text>
    </Box>
  );
};
