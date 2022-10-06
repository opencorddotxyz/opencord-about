import { Link } from "@chakra-ui/react";

export const OpenLink = (props: {
  children: React.ReactNode;
  href: string;
}) => {
  const { href, children } = props;

  return (
    <Link
      _hover={{ textDecoration: "none" }}
      _focus={{ border: "none", boxShadow: "none" }}
      isExternal
      _active={{
        border: "none",
        boxShadow: "none",
      }}
      href={href}
    >
      {children}
    </Link>
  );
};
