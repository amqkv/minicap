import { Grid, GridItem, Box, useDisclosure, Button } from '@chakra-ui/react';
import { Fragment } from 'react';
import UserList from './UserList';
import UserModal from './UserModal';

const UserLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Fragment>
      <Box px={7} py={9}>
        <Grid templateColumns="repeat(2,1fr)" gap="8">
          <GridItem>
            <UserList onOpen={onOpen} />
          </GridItem>
          <GridItem>
            <UserList onOpen={onOpen} />
          </GridItem>
          <GridItem>
            <UserList onOpen={onOpen} />
          </GridItem>
          <GridItem>
            <UserList onOpen={onOpen} />
          </GridItem>
        </Grid>
      </Box>
      <UserModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

export default UserLists;
