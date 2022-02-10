import { Flex, Avatar, Heading } from '@chakra-ui/react';
import NavLink from '@frontend/components/navigation/NavLink';
import { WEBSITE_NAME } from '@frontend/utils/constants';

export default function Logo() {
  return (
    <NavLink url="/">
      <Flex>
        <Avatar size={'md'} src={'https://i.imgur.com/nBBi6wd.png'} />
        <Heading as="h3" size="lg" alignSelf={'center'}>
          {WEBSITE_NAME}
        </Heading>
      </Flex>
    </NavLink>
  );
}
