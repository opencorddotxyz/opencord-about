import { Flex, Text } from "@chakra-ui/react";

export const TextToast = (props: { text: string; onClick?: () => void }) => {
  return (
    <Flex
      bg="transparent"
      align="center"
      mt="12px"
      maxW="644px"
      textAlign="center"
      justifyContent="center"
    >
      <Text
        textAlign="center"
        color="#FFFFFF"
        fontWeight="500"
        maxW="644px"
        fontSize="14px"
        bg="#3E3E3E"
        boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="100px"
        padding="6px 17px"
        lineHeight="18px"
        cursor={props.onClick ? "pointer" : "default"}
        onClick={props?.onClick}
      >
        {props.text}
      </Text>
    </Flex>
  );
};
