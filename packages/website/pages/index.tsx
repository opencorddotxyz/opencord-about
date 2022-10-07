import dynamic from "next/dynamic";
const PC = dynamic(() => import("@/componment/platform/home/pc") as any, {
  loading: () => <Box bg="#000" w="100vw" h="100vh" />,
});
const Mobile = dynamic(
  () => import("@/componment/platform/home/mobile") as any,
  {
    loading: () => <Box bg="#000" w="100vw" h="100vh" />,
  }
);

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useIsPC } from "../hooks/useIsPC";

const Page = () => {
  const [inited, setInited] = useState(false);
  useEffect(() => setInited(true), []);
  const isPC = useIsPC();
  return !inited ? (
    <Box bg="#000" w="100vw" h="100vh" />
  ) : isPC ? (
    <PC />
  ) : (
    <Mobile />
  );
};

const Home = () => {
  return <Page />;
};

export default Home;
