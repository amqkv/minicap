import { Box, List, GridItem } from '@chakra-ui/react';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import classes from './UserList.module.css';
import UserRowCard from './UserRowCard';

interface AppProps {
  userRole: string;
  onUserSelect: ({}: UserInfoSimple) => void;
  usersInfoSimple: UserInfoSimple[];
}

const UserList = ({ userRole, onUserSelect, usersInfoSimple }: AppProps) => {
  return (
    <GridItem>
      <Box>
        <h2 className={classes.titleFont}>
          {userRole} ({usersInfoSimple.length})
        </h2>
        <List
          overflowY="scroll"
          minHeight="26vh"
          maxHeight="26vh"
          py={2}
          m={0}
          alignItems={'left'}
          sx={{
            '&::-webkit-scrollbar': {
              width: '5px',
              borderRadius: '8px',
              backgroundColor: `#D5D4D4`,
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: `#7A7777`,
            },
          }}
        >
          {usersInfoSimple.map((userInfo) => {
            return (
              <UserRowCard
                key={userInfo.AccountId}
                onUserSelect={onUserSelect}
                userInfoSimple={userInfo}
              />
            );
          })}
        </List>
      </Box>
    </GridItem>
  );
};

export default UserList;
