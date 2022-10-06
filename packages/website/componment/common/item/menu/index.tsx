import { LayoutProps, MenuItem, MenuItemProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export const OMenuItem = (props: {
  children: ReactNode;
  itemProps?: MenuItemProps & LayoutProps;
}) => {
  const { children, itemProps } = props;
  return (
    <MenuItem
      {...itemProps}
      height="30px"
      _hover={{
        bg: "#282828",
      }}
      borderRadius="2px"
      width="100%"
      transition="0.3s"
      marginTop="4px"
      padding="10px 8px"
    >
      {children}
    </MenuItem>
  );
};
