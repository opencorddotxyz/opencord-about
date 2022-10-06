import {
  Box,
  Center,
  Text,
  Image,
  Flex,
  Spacer,
  Button,
  SimpleGrid,
  Link,
} from "@chakra-ui/react";
import { vwPX } from "@/utils";
import { Community, Download, Resources } from "../../common";
import {
  DAOItem,
  ExtensibleItem,
  GovernanceItem,
  OpenItem,
  SmoothItem,
  Web3Item,
} from "../../common/function";

export const Footer = () => {
  return (
    <Flex width="100%" bg="#FFF" textAlign="center" flexDir="column">
      <Box height={vwPX(80)} />
      <OpenCordTitle />
      <Box height={vwPX(50)} />
      <FunctionModules />
      <Box height={vwPX(80)} />
      <PlatForm />
      <Box height={vwPX(50)} />
      <Navigation />
      <Box height={vwPX(30)} />
    </Flex>
  );
};

export const Navigation = () => {
  const logo = (
    <Box>
      <Image
        alt="opencord"
        src="/imgs/opencord/opencord_blue.svg"
        width={vwPX(100)}
        height={vwPX(22)}
      />
      <Text
        marginTop={vwPX(30)}
        fontWeight="400"
        fontSize={vwPX(14)}
        lineHeight={vwPX(18)}
        color="#000000"
        opacity={0.7}
        textAlign={"left"}
      >
        The Web 3.0 social platform built for DAOs.
      </Text>
      <Box h={vwPX(92)} />
      <Text
        textAlign="left"
        fontWeight="400"
        fontSize={vwPX(14)}
        lineHeight={vwPX(18)}
        color="rgba(0, 0, 0, 0.3)"
      >
        © 2022 Opencord Lab LTD
      </Text>
    </Box>
  );

  return (
    <Center w="100%">
      <Flex w="1080px">
        {logo}
        <Box flex={180} />
        <Download />
        <Box flex={180} />
        <Community />
        <Box flex={180} />
        <Resources />
      </Flex>
    </Center>
  );
};

const PlatForm = () => {
  return (
    <Box height={vwPX(528)} position="relative">
      <Image
        alt=""
        height={vwPX(528)}
        width="100%"
        src="/imgs/banner/opencord_banner.svg"
        objectFit="cover"
      />
      <Flex
        height={vwPX(528)}
        width="100%"
        position="absolute"
        top="0"
        flexDirection="column"
        align={["start", "center"]}
      >
        <Spacer />
        <Flex
          height={vwPX(252)}
          width={vwPX(888)}
          bg="rgba(255,255,255,0.9)"
          borderRadius={vwPX(12)}
          flexDir="column"
          align="center"
        >
          <Spacer />
          <Text
            fontWeight="700"
            fontSize={vwPX(32)}
            lineHeight={vwPX(40)}
            color="#333333"
          >
            The Web 3.0 Social Platform Built For DAOs
          </Text>
          <Center>
            <Text
              marginTop={vwPX(20)}
              fontWeight="500"
              fontSize={vwPX(16)}
              lineHeight={vwPX(20)}
              color="#333333"
            >
              We are built for DAOs and building together with DAO friends.
              <br />
              Come and join us to build the ideal Web3 homebase and shape the
              future.
            </Text>
          </Center>

          <Flex marginTop={vwPX(30)} flexDirection={"row"}>
            <Spacer />
            <Link
              isExternal
              href={"./waitlist"}
              _hover={{ textDecoration: "none" }}
              _focus={{ border: "none", boxShadow: "none" }}
            >
              <Flex
                height={vwPX(36)}
                p={`0 ${vwPX(20)}`}
                borderRadius={vwPX(35)}
                color="#fff"
                fontWeight="600"
                fontSize={vwPX(12)}
                bg="#333333"
                align="center"
                justify="center"
              >
                <Text
                  marginRight={vwPX(10)}
                  fontWeight="600"
                  fontSize={vwPX(12)}
                >
                  Join Waitlist
                </Text>
                <Image
                  alt=""
                  src="/imgs/arrow/arrow_white_right.svg"
                  width={vwPX(20)}
                  height={vwPX(8)}
                />
              </Flex>
            </Link>
            <Spacer />
          </Flex>
          <Spacer />
        </Flex>
        <Spacer />
      </Flex>
    </Box>
  );
};

const FunctionModules = () => {
  return (
    <Center>
      <SimpleGrid
        columns={[1, 2, 3]}
        alignItems="center"
        alignContent="center"
        spacingX={vwPX(110)}
        spacingY={vwPX(40)}
      >
        <Web3Item />
        <DAOItem />
        <GovernanceItem />
        <SmoothItem />
        <ExtensibleItem />
        <OpenItem />
      </SimpleGrid>
    </Center>
  );
};

const OpenCordTitle = () => {
  return (
    <Flex flexDirection="column" align="center">
      <Text
        fontWeight="700"
        fontSize={vwPX(32)}
        lineHeight={vwPX(40)}
        color="#000000"
      >
        Why Opencord?
      </Text>

      <Text
        maxWidth={vwPX(550)}
        color="rgba(0, 0, 0, 0.5)"
        fontWeight="500"
        fontSize={vwPX(16)}
        lineHeight={vwPX(20)}
        marginTop={vwPX(20)}
      >
        Opencord is designed for the efficient connections of DAOs, the seamless
        connections of Dapps, and the like-mindedness connections of DAO
        friends.
      </Text>
    </Flex>
  );
};
