import {
  Box,
  List,
  ListItem,
  useColorModeValue,
  GridItem,
} from '@chakra-ui/react';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import classes from './UserList.module.css';
import UserRowCard from './UserRowCard';

interface AppProps {
  userRole: string;
  onUserSelect: ({}: UserInfoSimple) => void;
  onOpen: () => void;
  UsersInfoSimple: UserInfoSimple[];
}

const UserList = ({
  userRole,
  onUserSelect,
  onOpen,
  UsersInfoSimple,
}: AppProps) => {
  console.log(UsersInfoSimple);

  return (
    <GridItem>
      <Box overflow={'visible'}>
        <h2 className={classes.titleFont}>{userRole} (80)</h2>
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
          {UsersInfoSimple.map((userInfo) => {
            return (
              <UserRowCard
                key={userInfo.key}
                onUserSelect={onUserSelect}
                onOpen={onOpen}
                UserInfoSimple={userInfo}
              />
            );
          })}
        </List>
      </Box>
    </GridItem>
  );
};

export default UserList;
