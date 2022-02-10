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
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { WEBSITE_NAME, USER_ROLES } from '@frontend/utils/constants';
import NavLink from '@frontend/components/navigation/NavLink';
import { useSession } from 'next-auth/react';
import Logo from '@frontend/components/navigation/Logo';

const Links = [
  { text: 'HOME', url: '/' },
  {
    text: 'USER LIST',
    url: '/admin/user-list',
    roleRequired: USER_ROLES.admin,
  },
  {
    text: 'PATIENT INFO',
    url: '/doctor/patientinfo',
    roleRequired: USER_ROLES.doctor,
  },
];

export default function Simple() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const userRole = session?.user?.Role;

  return (
    <>
      <Box px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
            <Menu>
              {/* <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              > */}
                <Logo/>
              {/* </MenuButton> */}
              <HStack spacing={8} alignItems={'flex-end'}>
                <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                  {Links.map(({ text, url, roleRequired }) => {
                    const renderLink = roleRequired === userRole || !roleRequired;
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
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map(({ text, url, roleRequired }) => {
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
