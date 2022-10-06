/* eslint-disable jsx-a11y/alt-text */
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { vh, vw } from "@/utils";

import AnimationMobile from "../animation/animation";
import PowerAnimation from "../animation/power";
import ShowAnimation from "../animation/show";

const SecondPageMobile = () => {
  const _title = (
    <Flex flexDir="column">
      <Text
        fontWeight="700"
        fontSize={vw(46)}
        lineHeight={vw(60)}
        color="#FFFFFF"
        maxW={vw(582)}
      >
        Enjoy your DAO Time
      </Text>

      <Text
        marginTop={vh(20)}
        color="#FFFFFF"
        fontWeight="500"
        fontSize={vw(24)}
        lineHeight={vw(30)}
        opacity={0.5}
      >
        Seamlessly switch between messaging, voice, and Dapps, and discuss,
        propose and vote in one place.
      </Text>
    </Flex>
  );
  return (
    <Box
      paddingLeft={vw(100)}
      paddingRight={vw(100)}
      paddingTop={vw(60)}
      paddingBottom={vw(120 - 50)}
      // h={vw(780 + 284 * 4)}
    >
      {_title}
      <ChannelDetail channel="/imgs/channel/general.png" titleImage="text" />
      <ChannelDetail channel="/imgs/channel/voice.png" titleImage="voice" />
      <ChannelDetail channel="/imgs/channel/discuss.png" titleImage="discuss" />
      <ChannelDetail
        channel="/imgs/channel/snapshot.png"
        titleImage="snapshot"
      />
    </Box>
  );
};

export const Detail = () => {
  return (
    <Box bg="#000" width="100vw">
      <SecondPageMobile />
      <Box overflowX="hidden">
        <AnimationMobile />
        <PowerAnimation />
        <ShowAnimation />
        <Box height={vh(80)} />
      </Box>
    </Box>
  );
};

export const ChannelDetail = (props: {
  channel: string;
  titleImage: string;
}) => {
  const { channel = "", titleImage = "" } = props;
  return (
    <Flex align="self-start" flexDirection="column" marginTop={vh(80)}>
      <Image src={channel} border="none" width={vw(550)} objectFit="cover" />
      <Flex marginTop={vh(30)} align="center">
        <Image height={vh(70)} src={`/imgs/channel/icon_${titleImage}.svg`} />
      </Flex>
    </Flex>
  );
};
