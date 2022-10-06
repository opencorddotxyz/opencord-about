import dynamic from "next/dynamic";
import { isDesktop } from "@/utils";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { ReportType } from "@/constant/report";
import { isEmpty } from "@/utils/is";

const Report = dynamic(
  () => {
    return isDesktop()
      ? import("@/componment/platform/report/pc")
      : import("@/componment/platform/report/mobile");
  },
  {
    ssr: false,
  }
);

const ReportPage = () => {
  const router = useRouter();
  const { type = "" } = router.query;
  const reportTitle = useMemo(() => {
    const formatType = parseInt(type as string, 10);
    if (formatType === ReportType.USER) {
      return "User";
    }
    if (formatType === ReportType.SERVER) {
      return "Server";
    }
    if (formatType === ReportType.FORUM) {
      return "Forum";
    }
    if (formatType === ReportType.ANNOUNCEMENT) {
      return "Announcement";
    }
    return "";
  }, [type]);
  return (
    <>
      <Head>
        <title>{isEmpty(reportTitle) ? "" : `Report ${reportTitle}`} </title>
      </Head>
      <Report></Report>
    </>
  );
};

export default ReportPage;
