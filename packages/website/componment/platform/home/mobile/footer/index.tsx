import { vh, vw } from "@/utils";
import { Box, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { Community, Download, Resources } from "../../common";
import { FunctionItem } from "../../common/function";

export const FooterMobile = () => {
  return (
    <Box
      bg="#FFFFFF"
      paddingTop={vh(80)}
      paddingRight={vw(40)}
      paddingLeft={vw(40)}
      color="#000000"
    >
      <Text fontWeight="500" fontSize={vw(46)}>
        Why Opencord?
      </Text>
      <Text
        fontWeight="500"
        fontSize={vw(24)}
        opacity={0.5}
        marginTop={vh(20)}
        w={vw(670)}
      >
        Opencord is designed for the efficient connections of DAOs, the seamless
        connections of Dapps, and the like-mindedness connections of DAO
        friends.
      </Text>
      <SimpleGrid
        columns={2}
        alignItems="center"
        alignContent="center"
        spacingX={vw(35)}
        spacingY={vh(50)}
        marginTop={vh(60)}
      >
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/web3.svg"
          title="Web3"
          subtitle="Bringing your own identity, data and reputation."
        />
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/dao.svg"
          title="DAO"
          subtitle="Opencord is built for DAOs and building together with DAO friends. "
        />
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/governance.svg"
          title="Governance"
          subtitle="Discuss, propose and vote in one place."
        />
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/smooth.svg"
          title="Smooth"
          subtitle="Seamlessly switch between chat, voice, discussion, and Dapps."
        />
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/extensible.svg"
          title="Extensible"
          subtitle="Interact directly with Dapps and DAO tools."
        />
        <FunctionItem
          subTitleProps={{ textAlign: "center" }}
          src="/imgs/main/open.svg"
          title="Open"
          subtitle="Opencord has an open plugin system and source code free for everyone."
        />
      </SimpleGrid>
      <Box height={vh(80)} />
    </Box>
  );
};
