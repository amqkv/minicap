import {
  Grid,
  GridItem,
  Box,
  useDisclosure,
  Button,
  Spinner,
} from '@chakra-ui/react';
import { Fragment, useState, useEffect } from 'react';
import UserList from './UserList';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import UserModal from './UserModal';
import useRole from '@frontend/hooks/userRole';

// for (let i = 0; i < 5; i++) {
//   let userArray: UserInfoSimple[] = [];
//   for (let j = 0; j < 6; j++) {
//     let user: UserInfoSimple = {
//       key: i * 5 + j,
//       firstName: `First ${i * 5 + j} `,
//       lastName: `Last ${i}`,
//     };
//     userArray.push(user);
//   }
//   DUMMY_ARRAY[`Role${i}`] = userArray;
// }

const UserLists = () => {
  const { userRoles, isLoading, isError } = useRole();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userSelected, setUserSelected] = useState<UserInfoSimple>({
    AccountId: 0,
    FirstName: '',
    LastName: '',
    Role: '',
  });
  let keys: string[] = [];
  console.log(userRoles);
  if (!!userRoles) {
    keys = Object.keys(userRoles);
  }

  const userSelectedHandler = (user: UserInfoSimple) => {
    setUserSelected(user);
  };

  return (
    <Fragment>
      {isLoading && <Spinner />}
      {isError && <p> THere is an error </p>}

      {!!userRoles && (
        <Box px={7} py={20}>
          <Grid
            templateColumns="repeat(2,1fr)"
            gap="8"
            overflowY="scroll"
            maxHeight="70vh"
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
            {keys.map((key) => {
              return (
                <UserList
                  key={key}
                  userRole={key}
                  UsersInfoSimple={userRoles[key]}
                  onUserSelect={userSelectedHandler}
                  onOpen={onOpen}
                />
              );
            })}
          </Grid>
        </Box>
      )}
      <UserModal isOpen={isOpen} onClose={onClose} userInfo={userSelected} />
    </Fragment>
  );
};

export default UserLists;
