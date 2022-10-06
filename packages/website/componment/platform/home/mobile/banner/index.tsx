import { Box, Image, Flex, Text, Center, Link } from "@chakra-ui/react";
import { vh, vw } from "@/utils";
export const BannerMobile = () => {
  return (
    <Box width={vw(750)} height={vh(670)} position="relative">
      <Image
        alt="banner_mobile"
        src="/imgs/banner/banner_mobile.svg"
        width={vw(750)}
        height={vh(670)}
        objectFit="cover"
      />
      <Center position="absolute" width={vw(750)} height={vh(670)} top="0">
        <Flex
          bg="#FFF"
          width={vw(670)}
          height={vw(388)}
          borderRadius={vw(12)}
          flexDirection="column"
          justify="center"
          align="center"
        >
          <Text fontWeight="700" fontSize={vw(46)} color="#333333">
            What&apos;s Next?
          </Text>
          <Box h={vw(20)} />
          <Text
            textAlign="center"
            fontWeight="500"
            maxW={vw(590)}
            fontSize={vw(24)}
            lineHeight={vw(30)}
            color="rgba(51, 51, 51, 0.5)"
            marginTop={vh(20)}
          >
            We are built for DAOs and building together with DAO friends. Come
            and join us to build the ideal Web3 homebase and shape the future.
          </Text>
          <Link
            isExternal
            href={"./waitlist"}
            _hover={{ textDecoration: "none" }}
            _focus={{ border: "none", boxShadow: "none" }}
          >
            <Center
              width={vw(270)}
              height={vh(70)}
              borderRadius={vh(70)}
              bg="#333333"
              marginTop={vh(40)}
              transition="0.3s"
            >
              <Text
                fontWeight="600"
                fontSize={vw(24)}
                lineHeight={vh(70)}
                color="#FFFFFF"
                textAlign="center"
              >
                Join Waitlist
              </Text>
            </Center>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
};
