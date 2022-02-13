import {
  Box,
  Flex,
  Avatar,
  HStack,
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
import NavLink from "@frontend/components/navigation/navlink";
import { useSession } from "next-auth/react";
import Logo from "@frontend/components/navigation/logo";
import { links, link } from "@frontend/components/navigation/navbar-structure";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const userRole = session?.user?.Role;

  return (
    <>
      <Box as="header" px={4}>
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
              <Logo />
              {/* </MenuButton> */}
              <HStack spacing={8} alignItems={"flex-end"}>
                <HStack
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  {links.map(({ text, url, roleRequired }: link) => {
                    const renderLink =
                      roleRequired === userRole || !roleRequired;
                    return (
                      renderLink && (
                        <NavLink textDecoration key={text} url={url}>
                          {text}
                        </NavLink>
                      )
                    );
                  })}
                </HStack>
              </HStack>
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
              {links.map(({ text, url, roleRequired }: link) => {
                const renderLink = roleRequired === userRole || !roleRequired;

                return (
                  renderLink && (
                    <NavLink textDecoration key={text} url={url}>
                      {text}
                    </NavLink>
                  )
                );
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
