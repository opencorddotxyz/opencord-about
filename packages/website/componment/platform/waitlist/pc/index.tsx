import { TextToast } from "@/componment/common";
import {
  EMPTY_NAME,
  INVALID_ADDRESS,
  INVALID_COMMUNITY,
  INVALID_EMAIL,
  INVALID_REASON,
  INVALID_TWITTER,
} from "@/constant";
import {
  applyJoinWaitlist,
  ApplyJoinWaitlistRequest,
} from "@/net/http/gateway";
import { uniformLength } from "@/utils/string";
import {
  Box,
  Center,
  Image,
  Flex,
  Text,
  Input,
  Textarea,
  InputProps,
  TextareaProps,
  Spacer,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const FORUM = 0;
const SUBMITSUCCESS = 1;

const WaitPc = () => {
  const [status, setStatus] = useState(FORUM);

  return (
    <Box
      backgroundImage="/imgs/wait/wait_pc.svg"
      width="100vw"
      height="100vh"
      backgroundSize="cover"
      overflowX="hidden"
      overflowY="scroll"
    >
      {status === FORUM ? (
        <ApplicationOpencord setStatus={setStatus} />
      ) : (
        <SubmitSuccess />
      )}
    </Box>
  );
};
export default WaitPc;

const SubmitSuccess = () => {
  return (
    <Flex
      flexDirection="column"
      align="center"
      color="#fff"
      width="100vw"
      height="100vh"
    >
      <Spacer />
      <Image
        width="72px"
        height="72px"
        alt="success"
        borderRadius="50%"
        src="/imgs/icon/success.svg"
      />
      <Text fontWeight="700" fontSize="28px" lineHeight="36px" marginTop="30px">
        Request Sent
      </Text>
      <Text
        fontWeight="400"
        fontSize="16px"
        lineHeight="29px"
        marginTop="30px"
        opacity={0.5}
      >
        We will be in touch with you shortly.
      </Text>
      <Spacer />
    </Flex>
  );
};

const emptyForm: ApplyJoinWaitlistRequest = {
  name: "",
  email: "",
  address: "",
  twitter: "",
  community: "",
  reason: "",
};

type IErrorType =
  | "name"
  | "email"
  | "address"
  | "twitter"
  | "community"
  | "reason"
  | "";
const ApplicationOpencord = (props: { setStatus: (value: number) => void }) => {
  const { setStatus } = props;
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ApplyJoinWaitlistRequest>(emptyForm);

  const [error, setError] = useState<{
    type: IErrorType;
    message: string;
  }>({
    type: "",
    message: "",
  });
  const {
    name = "",
    email = "",
    address = "",
    twitter = "",
    community = "",
    reason = "",
  } = form;
  const toast = useToast();
  const submit = async () => {
    if (uniformLength(name) === 0) {
      setError({ type: "name", message: "Should not be empty!" });
      return;
    }
    if (uniformLength(email) === 0) {
      setError({ type: "email", message: "Should not be empty!" });
      return;
    }
    if (uniformLength(address) === 0) {
      setError({ type: "address", message: "Should not be empty!" });
      return;
    }
    if (uniformLength(reason) === 0) {
      setError({ type: "reason", message: "Should not be empty!" });
      return;
    }

    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const result = await applyJoinWaitlist(form);

      if (result.code) {
        if (result.code === EMPTY_NAME) {
          return setError({ type: "name", message: result?.message ?? "" });
        }
        if (result.code === INVALID_EMAIL) {
          return setError({ type: "email", message: result?.message ?? "" });
        }
        if (result.code === INVALID_ADDRESS) {
          return setError({ type: "address", message: result?.message ?? "" });
        }
        if (result.code === INVALID_TWITTER) {
          return setError({ type: "twitter", message: result?.message ?? "" });
        }
        if (result.code === INVALID_COMMUNITY) {
          return setError({
            type: "community",
            message: result?.message ?? "",
          });
        }
        if (result.code === INVALID_REASON) {
          return setError({ type: "reason", message: result?.message ?? "" });
        }
        toast({
          position: "top",
          render: () => {
            return <TextToast text={result.message} />;
          },
        });
        return;
      }
      setStatus(SUBMITSUCCESS);
    } catch {
      toast({
        position: "top",
        render: () => {
          return <TextToast text="Something went wrong, please try again." />;
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const clearError = (errorType: IErrorType) => {
    if (error?.type === errorType && error.message.length > 0) {
      setError({
        type: "",
        message: "",
      });
    }
  };

  return (
    <Center paddingTop="64px" paddingBottom="84px">
      <Box width="480px">
        <Center>
          <Image height="48px" alt="" src="/imgs/opencord/logo.svg" />
        </Center>
        <Box height="30px" />
        <OpencordInput
          title="Name"
          value={name}
          error={error?.type === "name" ? error.message : ""}
          inputProps={{ maxLength: 32, minLength: 1, autoFocus: true }}
          onChange={(name) => {
            setForm((pre) => {
              return { ...pre, name };
            });
            clearError("name");
          }}
        />
        <OpencordInput
          title="Email"
          value={email}
          inputProps={{ maxLength: 64, minLength: 1 }}
          error={error?.type === "email" ? error.message : ""}
          onChange={(email) => {
            setForm((pre) => {
              return { ...pre, email };
            });
            clearError("email");
          }}
        />
        <OpencordInput
          title="Wallet Address"
          value={address}
          error={error?.type === "address" ? error.message : ""}
          subTitle="Once your application is approved, you will be able to use this wallet address to log in to Opencord."
          inputProps={{ placeholder: "0x1234...abcd", maxLength: 42 }}
          onChange={(address) => {
            setForm((pre) => {
              return { ...pre, address };
            });
            clearError("address");
          }}
        />
        <OpencordInput
          title="Your Twitter Link (optional)"
          value={twitter}
          subTitle="Please make sure your DM is open. We will reach out to you soon."
          inputProps={{
            placeholder: "https://twitter.com/example",
            maxLength: 64,
          }}
          onChange={(twitter) => {
            setForm((pre) => {
              return { ...pre, twitter };
            });
            clearError("twitter");
          }}
        />
        <OpencordText
          title="Your Community and Roles (optional)"
          subTitle="What DAOs or communities do you participate in, and what is your role in them?"
          inputProps={{
            maxLength: 1000,
            placeholder:
              "e.g. member of XXX, core contributor of XXX, founder of XXX",
          }}
          value={community}
          onChange={(community) => {
            setForm((pre) => {
              return { ...pre, community };
            });
          }}
        />
        <OpencordText
          title="Why do you want to use Opencord?"
          inputProps={{ maxLength: 1000 }}
          value={reason}
          error={error?.type === "reason" ? error.message : ""}
          onChange={(reason) => {
            setForm((pre) => {
              return { ...pre, reason };
            });
            clearError("reason");
          }}
        />
        <Center>
          <Flex
            width="128px"
            height="36px"
            bg="#fff"
            marginTop="40px"
            borderRadius="36px"
            lineHeight="36px"
            textAlign="center"
            fontWeight="600"
            fontSize="14px"
            color="#000000"
            onClick={submit}
            cursor="pointer"
            userSelect="none"
            align="center"
          >
            <Spacer />
            {loading ? <Spinner w="18px" h="18px" /> : "Join Waitlist"}
            <Spacer />
          </Flex>
        </Center>
      </Box>
    </Center>
  );
};

const OpencordInput = (props: {
  onChange?: (value: string) => void;
  title: string;
  subTitle?: string;
  error?: string;
  inputProps?: InputProps;
  value: string;
}) => {
  const { onChange, error, subTitle, title, inputProps, value = "" } = props;

  return (
    <Box width="100%">
      <Flex align="center" marginTop="10px">
        <Text
          fontWeight="600"
          fontSize="16px"
          lineHeight="16px"
          color="#fff"
          opacity={0.6}
          marginRight="5px"
          marginBottom="10px"
        >
          {title}
        </Text>
        {error ? (
          <Text
            color="#F96262"
            fontWeight="400"
            fontSize="14px"
            lineHeight="15px"
            marginBottom="10px"
          >
            {error}
          </Text>
        ) : (
          <Box />
        )}
      </Flex>
      {subTitle ? (
        <Text
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#fff"
          opacity={0.3}
          marginBottom="10px"
        >
          {subTitle}
        </Text>
      ) : (
        <Box />
      )}
      <Input
        marginBottom="10px"
        bg="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255,0.15)"
        borderColor="rgba(255, 255, 255, 0.15)"
        borderRadius="6px"
        height="36px"
        padding="9px 10px"
        color="#FFF"
        fontWeight="600"
        fontSize="14px"
        lineHeight="18px"
        value={value}
        _placeholder={{
          fontWeight: "400",
          fontsize: "14px",
          lineHeight: "18px",
          color: "#fff",
          opacity: 0.3,
        }}
        _hover={{
          border: "1px solid rgba(255, 255, 255,0.15)",
        }}
        _focus={{
          borderColor: "rgba(255, 255, 255,0.15)",
          boxShadow: "none",
        }}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        {...inputProps}
      />
    </Box>
  );
};
const OpencordText = (props: {
  onChange?: (value: string) => void;
  title: string;
  subTitle?: string;
  error?: string;
  inputProps?: TextareaProps;
  value: string;
}) => {
  const { onChange, error, subTitle, title, inputProps, value = "" } = props;

  return (
    <Box width="100%">
      <Flex align="center" marginTop="10px">
        <Text
          fontWeight="600"
          fontSize="16px"
          lineHeight="16px"
          color="#fff"
          opacity={0.6}
          marginRight="5px"
          marginBottom="10px"
        >
          {title}
        </Text>
        {error ? (
          <Text
            color="#F96262"
            fontWeight="400"
            fontSize="14px"
            lineHeight="15px"
            marginBottom="10px"
          >
            {error}
          </Text>
        ) : (
          <Box />
        )}
      </Flex>
      {subTitle ? (
        <Text
          fontWeight="400"
          fontSize="14px"
          lineHeight="18px"
          color="#fff"
          opacity={0.3}
          marginBottom="10px"
        >
          {subTitle}
        </Text>
      ) : (
        <Box />
      )}
      <Textarea
        marginBottom="10px"
        bg="rgba(255, 255, 255, 0.1)"
        border="1px solid rgba(255, 255, 255,0.15)"
        borderColor="rgba(255, 255, 255, 0.15)"
        borderRadius="6px"
        height="72px"
        padding="9px 10px"
        color="#FFF"
        fontWeight="600"
        fontSize="14px"
        lineHeight="18px"
        value={value}
        _placeholder={{
          fontWeight: "400",
          fontsize: "14px",
          lineHeight: "18px",
          color: "#fff",
          opacity: 0.3,
        }}
        _hover={{
          border: "1px solid rgba(255, 255, 255,0.15)",
        }}
        _focus={{
          borderColor: "rgba(255, 255, 255,0.15)",
          boxShadow: "none",
        }}
        resize="none"
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        {...inputProps}
      />
    </Box>
  );
};
