import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  Heading,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { MAIN_COLOR, WEBSITE_NAME } from "@frontend/utils/constants";

interface NavLinkProps {
  children?: ReactNode;
  url: string;
}

const Links = [
  { text: "HOME", url: "#" },
  { text: "ABOUT", url: "#" },
  { text: "CONTACT", url: "#" },
];

const NavLink = ({ children, url }: NavLinkProps) => (
  <NextLink href={url} passHref>
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "underline",
        textDecorationColor: MAIN_COLOR,
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex
            alignItems={"center"}
            width={"100%"}
            justifyContent={"space-between"}
          >
            <Menu>
              {/* <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              > */}
              <Flex>
                <Avatar size={"md"} src={"https://i.imgur.com/nBBi6wd.png"} />
                <Heading as="h3" size="lg" alignSelf={"center"}>
                  {WEBSITE_NAME}
                </Heading>
              </Flex>
              {/* </MenuButton> */}
              <HStack spacing={8} alignItems={"flex-end"}>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {Links.map(({ text, url }) => (
                    <NavLink key={text} url={url}>
                      {text}
                    </NavLink>
                  ))}
                </HStack>
              </HStack>
              {/* <MenuList>
                <MenuItem>Link 1</MenuItem>
                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
              </MenuList> */}
            </Menu>
          </Flex>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map(({ text, url }) => (
                <NavLink key={text} url={url as any}>
                  {text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
