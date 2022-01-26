import { Box, List, ListItem, useColorModeValue } from '@chakra-ui/react';
import classes from './UserList.module.css';
import UserRowCard from './UserRowCard';

const UserList = () => {
  return (
    <Box overflow={'visible'}>
      <h2 className={classes.titleFont}>Doctor (80)</h2>
      <List
        overflowY="scroll"
        overflow={'auto'}
        maxHeight="26vh"
        py={2}
        m={0}
        alignItems={'left'}
        sx={{
          '&::-webkit-scrollbar': {
            width: '2.5px',
            borderRadius: '8px',
            backgroundColor: `#D5D4D4`,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: `#7A7777`,
          },
        }}
      >
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
        <UserRowCard />
      </List>
    </Box>
  );
};

export default UserList;
