import { Grid, GridItem, Box } from '@chakra-ui/react';
import { Fragment } from 'react';
import UserList from './UserList';

const UserLists = () => {
  return (
    <Box px={7} py={9}>
      <Grid templateColumns="repeat(2,1fr)" gap="8">
        <GridItem>
          <UserList />
        </GridItem>
        <GridItem>
          <UserList />
        </GridItem>
        <GridItem>
          <UserList />
        </GridItem>
        <GridItem>
          <UserList />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default UserLists;
