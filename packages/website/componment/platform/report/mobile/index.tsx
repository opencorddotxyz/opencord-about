import {
  Box,
  Flex,
  Spacer,
  Text,
  Image,
  Textarea,
  Center,
  CircularProgress,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

import { vw } from "@/utils";
import { useEffect, useMemo, useRef, useState } from "react";
import ImagesList from "@/componment/common/imageList";
import {
  CommonImage,
  getReportReasons,
  submitReport,
} from "@/net/http/gateway";

import { TextToast } from "@/componment";
import { isEmpty } from "@/utils/is";

const ReportMobile = () => {
  const [reasons, setReasons] = useState<string[]>([]);
  const [reportStatus, setReportStatus] = useState<boolean>(false);

  useEffect(() => {
    getReasons();
  }, []);

  const getReasons = async () => {
    const result = await getReportReasons();
    if (result.code) {
      return;
    }
    setReasons(result?.data?.reasons ?? []);
  };

  const [reportReasons, setReportReasons] = useState<number>();

  const content = useMemo(() => {
    if (reportStatus) {
      return (
        <Box width="100%">
          <Box height={vw(180)} />
          <Center>
            <Image
              alt="success"
              src="/imgs/success/success.svg"
              width={vw(90)}
              height={vw(90)}
            />
          </Center>
          <Box height={vw(18)} />
          <Center>
            <Text fontWeight="700" fontSize={vw(46)} lineHeight={vw(58)}>
              Succeed
            </Text>
          </Center>
          <Box height={vw(18)} />
          <Center>
            <Text
              textAlign="center"
              fontWeight="700"
              fontSize={vw(26)}
              lineHeight={vw(33)}
              color="#999999"
              maxW={vw(565)}
            >
              We have received your report and thank you for your feedback.
            </Text>
          </Center>
        </Box>
      );
    }
    if (reportReasons) {
      return (
        <ReportContent
          reportReasons={reportReasons}
          setReportStatus={setReportStatus}
        />
      );
    }
    return (
      <>
        <Box height={vw(36)} />
        <Box
          paddingLeft={vw(30)}
          fontWeight="500"
          fontSize="13px"
          lineHeight="16px"
          color="#777777"
        >
          <Text>Please select the type that best describes the problem.</Text>
        </Box>
        <Box height={vw(36)} />
        {reasons?.map((val, index) => {
          return (
            <ReportInformationItem
              text={val}
              type={index + 1}
              onClick={setReportReasons}
              key={index}
            />
          );
        })}
      </>
    );
  }, [reasons, reportReasons, reportStatus]);

  return (
    <Box bg="#1B1B1B" color="#FFF" height="100vh">
      {content}
    </Box>
  );
};
export default ReportMobile;

const ReportInformationItem = (props: {
  text: string;
  type: number;
  onClick: (type: number) => void;
}) => {
  const { text = "", onClick, type } = props;
  return (
    <Box height={vw(90)} width="100vw" paddingX={vw(30)}>
      <Flex
        align="center"
        height={vw(90)}
        paddingY={vw(30)}
        borderBottom="1px solid rgba(255,255,255,0.05)"
        onClick={() => {
          onClick(type);
        }}
      >
        <Text
          fontWeight="400"
          fontSize={vw(26)}
          lineHeight={vw(30)}
          color="#FFF"
        >
          {text}
        </Text>
        <Spacer />
        <Image
          alt="arrow"
          src="/imgs/arrow/arrow_right.svg"
          width={vw(30)}
          height={vw(30)}
        />
      </Flex>
    </Box>
  );
};

const ReportContent = (props: {
  reportReasons: number;
  setReportStatus: (status: boolean) => void;
}) => {
  const toast = useToast();
  const { reportReasons, setReportStatus } = props;
  const router = useRouter();
  const { id = "", type = "1" } = router.query;
  const [reason, setReason] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>();
  const [uploading, setUploading] = useState<boolean>(false);
  const imageRef = useRef<CommonImage[]>([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const submit = async () => {
    if (reason.length < 100 || reason.length > 1000) {
      setErrorMessage("Should be 100-1000 characters.");
      return;
    }

    const finalImages = imageRef.current
      ?.map((val) => {
        return val.url;
      })
      .filter((val) => {
        return !isEmpty(val);
      });

    setSubmitLoading(true);

    try {
      const result = await submitReport({
        resourceType: parseInt(type as string, 10) ?? 1,
        resourceId: id as string,
        reason: reportReasons,
        content: reason,
        images: finalImages ?? [],
      });
      if (result.code) {
        toast({
          position: "top",
          render: () => {
            return <TextToast text={result.message} />;
          },
        });

        return;
      }
      setReportStatus(true);
    } catch (error) {
      toast({
        position: "top",
        render: () => {
          return <TextToast text="network error" />;
        },
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box paddingX={vw(30)} bg="#1B1B1B">
      <Box height={vw(36)} />
      <Textarea
        height={vw(224)}
        border="none"
        value={reason}
        onChange={(e) => {
          const inputValue = e.target.value;
          setReason(inputValue);
          if (errorMessage && inputValue.length > 100) {
            setErrorMessage(undefined);
          }
        }}
        padding="10px"
        _focus={{ boxShadow: "none", outline: "none" }}
        placeholder="Describe your prolem"
        _placeholder={{ color: "#4D4D4D", opacity: 0.5 }}
        color="#FFF"
        maxLength={1000}
      />
      <Flex>
        {errorMessage ? (
          <Text
            fontWeight="400"
            fontSize="13px"
            lineHeight="30px"
            color="#D25252"
          >
            {errorMessage}
          </Text>
        ) : (
          <Box />
        )}
        <Spacer />
        <Text
          fontWeight="400"
          fontSize={vw(26)}
          lineHeight={vw(30)}
          color="#777777"
        >
          {reason.length}/1000
        </Text>
      </Flex>
      <Box height={vw(24)} />
      <Box height="1px" width="100%" bg="rgba(255, 255, 255, 0.05)" />
      <Box height={vw(24)} />
      <ImagesList
        images={[]}
        updateUploadLoading={setUploading}
        ref={imageRef}
      />
      <Box height={vw(24)} />
      <Box height="1px" width="100%" bg="rgba(255, 255, 255, 0.05)" />
      <Box height={vw(72)} />
      <Center>
        <Flex
          width={vw(300)}
          height={vw(72)}
          bg="#363636"
          borderRadius="10px"
          onClick={() => {
            if (uploading) {
              return;
            }
            submit();
          }}
          align="center"
        >
          <Spacer />
          {submitLoading ? (
            <CircularProgress
              isIndeterminate
              size={vw(52)}
              color="#363636"
              trackColor="#FFFFFF"
            />
          ) : (
            <Text
              textAlign="center"
              lineHeight={vw(72)}
              fontWeight="600"
              fontSize={vw(28)}
            >
              Submit
            </Text>
          )}
          <Spacer />
        </Flex>
      </Center>
    </Box>
  );
};
