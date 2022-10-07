import { useBreakpointValue } from "@chakra-ui/media-query";

export function useIsPC() {
  return useBreakpointValue({ base: false, md: false, lg: true });
}
