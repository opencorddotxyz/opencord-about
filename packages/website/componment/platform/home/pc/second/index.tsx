import { vh2px, vwPX, vwPx } from "@/utils";
import { Box, Flex, Text, Center, Image, Spacer } from "@chakra-ui/react";

import { useScroll, useTransform, motion } from "framer-motion";

export const SecondPage = () => {
  const { scrollY } = useScroll();
  const topMenuHeight = 62;
  const topPadding = 13;
  const titleHeight = 80 + 96;
  const imgHeight = 284;
  const topHeight = topMenuHeight + topPadding;
  const h780Fix = vh2px(100) - 780 + topHeight;

  const y = useTransform(
    scrollY,
    [0, 780 + h780Fix],
    [
      `-${vwPx(
        30 +
          (vh2px(100) - topHeight - titleHeight - imgHeight) / 2 +
          titleHeight
      )}px`,
      "0px",
    ]
  );
  const width = useTransform(
    scrollY,
    [0, 780 + h780Fix],
    [`${vwPx(1080)}px`, `${vwPx(573)}px`]
  );
  const height = useTransform(
    scrollY,
    [0, 780 + h780Fix],
    [`${vh2px(100) - topHeight + 30 * 2}px`, `${vwPx(284)}px`]
  );
  const border = useTransform(
    scrollY,
    [0, 780 + h780Fix],
    ["2px solid rgba(255,255,255,0.1)", "2px solid #fff"]
  );

  const isShowTitle = useTransform(
    scrollY,
    [0, 780 + h780Fix],
    ["0px", `${vwPx(326)}px`]
  );

  const first = useTransform(
    scrollY,
    [0, vwPx(780)],
    [`${vwPx(284)}px`, "0px"]
  );

  const firstTop = useTransform(
    scrollY,
    [vwPx(780 + h780Fix), vwPx(900 + h780Fix)],
    [`${vwPx(284)}px`, "0px"]
  );
  const firstOp = useTransform(
    scrollY,
    [vwPx(780 + h780Fix), vwPx(900 + h780Fix)],
    [1, 1]
  );
  const firstTextTop = useTransform(
    scrollY,
    [vwPx(780 + h780Fix), vwPx(900 + h780Fix), vwPx(1184 + h780Fix)],
    [`${vwPx(284)}px`, `${vwPx(214)}px`, `${vwPx(144)}px`]
  );
  const firstTextOp = useTransform(
    scrollY,
    [vwPx(780 + h780Fix), vwPx(900 + h780Fix), vwPx(1184 + h780Fix)],
    [0, 1, 0]
  );

  const secondTop = useTransform(
    scrollY,
    [vwPx(900 + h780Fix), vwPx(1184 + h780Fix)],
    [`${vwPx(284)}px`, "0px"]
  );
  const secondOp = useTransform(
    scrollY,
    [vwPx(900 + h780Fix), vwPx(1184 + h780Fix)],
    [1, 1]
  );
  const secondTextTop = useTransform(
    scrollY,
    [vwPx(900 + h780Fix), vwPx(1184 + h780Fix), vwPx(1468 + h780Fix)],
    [`${vwPx(284)}px`, `${vwPx(214)}px`, `${vwPx(144)}px`]
  );
  const secondTextOp = useTransform(
    scrollY,
    [vwPx(900 + h780Fix), vwPx(1184 + h780Fix), vwPx(1468 + h780Fix)],
    [0, 1, 0]
  );

  const thirdTop = useTransform(
    scrollY,
    [vwPx(1184 + h780Fix), vwPx(1468 + h780Fix)],
    [`${vwPx(284)}px`, "0px"]
  );
  const thirdOp = useTransform(
    scrollY,
    [vwPx(1184 + h780Fix), vwPx(1468 + h780Fix)],
    [1, 1]
  );
  const thirdTextTop = useTransform(
    scrollY,
    [vwPx(1184 + h780Fix), vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [`${vwPx(284)}px`, `${vwPx(214)}px`, `${vwPx(144)}px`]
  );
  const thirdTextOp = useTransform(
    scrollY,
    [vwPx(1184 + h780Fix), vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [0, 1, 0]
  );

  const fourthTop = useTransform(
    scrollY,
    [vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [`${vwPx(284)}px`, "0px"]
  );
  const fourthOp = useTransform(
    scrollY,
    [vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [1, 1]
  );
  const fourthTextTop = useTransform(
    scrollY,
    [vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [`${vwPx(284)}px`, `${vwPx(214)}px`]
  );
  const fourthTextOp = useTransform(
    scrollY,
    [vwPx(1468 + h780Fix), vwPx(1752 + h780Fix)],
    [0, 1]
  );

  const _title = (
    <Flex>
      <Box width="540px" />
      <Box maxW={vwPX(350)} h="96px">
        <Text fontWeight="700" fontSize={vwPX(32)} lineHeight={vwPX(40)}>
          Enjoy your DAO time
        </Text>
        <Text
          fontWeight="500"
          fontSize={vwPX(16)}
          lineHeight={vwPX(20)}
          opacity={0.5}
          marginTop={vwPX(20)}
        >
          Seamlessly switch between messaging, voice, and Dapps, and discuss,
          propose and vote in one place.
        </Text>
      </Box>
    </Flex>
  );

  const _body = (
    <Box
      position="relative"
      padding="0"
      height={`${vwPx(284)}px`}
      as={motion.div}
    >
      <Flex alignItems="flex-end">
        <Spacer />
        <motion.div style={{ width: isShowTitle }} />
        <motion.div
          style={{
            y,
            width,
            height,
            outline: border,
            background: "transparent",
            zIndex: 10,
          }}
        />
        <Spacer />
      </Flex>

      <Flex
        width="100%"
        position="absolute"
        top={`${vwPx(284)}px`}
        right={`-${vwPx(6)}px`}
        zIndex={2}
      >
        <Spacer />
        <Box width={`${vwPx(324)}px`} />
        <Box height={`${vwPx(284)}px`} width={`${vwPx(600)}px`} bg="#000" />
        <Spacer />
      </Flex>

      <Center>
        <motion.div
          style={{
            height: `${vwPx(284)}px`,
            width: vwPX(41),
            background: "transparent",
            top: first,
            position: "absolute",
          }}
        />
      </Center>

      <motion.div
        style={{
          top: firstTop,
          opacity: firstOp,
          display: "flex",
          position: "absolute",
          width: "100%",
        }}
      >
        <Spacer />
        <Box width={`${vwPx(326)}px`} height={vwPX(70)} />

        <Image
          height={`${vwPx(284)}px`}
          src="/imgs/channel/general.png"
          fit="cover"
          alt=""
        />

        <Spacer />
      </motion.div>

      <motion.div
        style={{
          top: firstTextTop,
          opacity: firstTextOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <ChannelText icon="text" />
      </motion.div>

      <motion.div
        style={{
          top: secondTop,
          opacity: secondOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <Spacer />
        <Box width={`${vwPx(326)}px`} />
        <Box
          height={`${vwPx(284)}px`}
          width={`${vwPx(573)}px`}
          backgroundImage="/imgs/channel/voice.png"
          backgroundSize="cover"
        />
        <Spacer />
      </motion.div>

      <motion.div
        style={{
          top: secondTextTop,
          opacity: secondTextOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <ChannelText icon="voice" />
      </motion.div>

      <motion.div
        style={{
          top: thirdTop,
          opacity: thirdOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <Spacer />
        <Box width={`${vwPx(326)}px`} />
        <Box
          height={`${vwPx(284)}px`}
          width={`${vwPx(573)}px`}
          backgroundImage="/imgs/channel/discuss.png"
          backgroundSize="cover"
        />
        <Spacer />
      </motion.div>

      <motion.div
        style={{
          top: thirdTextTop,
          opacity: thirdTextOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <ChannelText icon="discuss" />
      </motion.div>

      <motion.div
        style={{
          top: fourthTop,
          opacity: fourthOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <Spacer />
        <Box width={`${vwPx(326)}px`} />
        <Box
          height={`${vwPx(284)}px`}
          width={`${vwPx(573)}px`}
          backgroundImage="/imgs/channel/snapshot.png"
          backgroundSize="cover"
        />
        <Spacer />
      </motion.div>

      <motion.div
        style={{
          top: fourthTextTop,
          opacity: fourthTextOp,
          position: "absolute",
          width: "100%",
          display: "flex",
        }}
      >
        <ChannelText icon="snapshot" />
      </motion.div>
    </Box>
  );

  return (
    <Flex
      flexDirection="column"
      maxWidth="100vw"
      color="#FFFFFF"
      align="center"
      height={`calc(100vh - ${vwPx(topMenuHeight)}px + ${vwPx(284 * 4)}px)`}
    >
      <Flex
        flexDir="column"
        position="sticky"
        top={vwPx(topMenuHeight)}
        width="1080px"
        height={`calc(100vh - ${vwPx(topMenuHeight)}px)`}
      >
        <Box flex={80} />
        {_title}
        <Box flex={140} />
        {_body}
        <Box flex={180} />
      </Flex>
    </Flex>
  );
};

const ChannelText = (p: { icon: string }) => {
  return (
    <>
      <Spacer />
      <Flex width={`${vwPx(224)}px`} align="end">
        <Image
          height={`${vwPx(70)}px`}
          src={`/imgs/channel/icon_${p.icon}.svg`}
          alt=""
        />
      </Flex>
      <Box width={`${vwPx(573)}px`} />
      <Spacer />
    </>
  );
};
