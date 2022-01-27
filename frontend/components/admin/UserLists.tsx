import { Grid, GridItem, Box, useDisclosure, Button } from '@chakra-ui/react';
import { Fragment, useState } from 'react';
import UserList from './UserList';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import UserModal from './UserModal';

let DUMMY_ARRAY: { [key: string]: UserInfoSimple[] } = {};

for (let i = 0; i < 5; i++) {
  let userArray: UserInfoSimple[] = [];
  for (let j = 0; j < 6; j++) {
    let user: UserInfoSimple = {
      key: i * 5 + j,
      firstName: `First ${i * 5 + j} `,
      lastName: `Last ${i}`,
    };
    userArray.push(user);
  }
  DUMMY_ARRAY[`Role${i}`] = userArray;
}
let keys = Object.keys(DUMMY_ARRAY);

const UserLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userSelected, setUserSelected] = useState<UserInfoSimple>({
    firstName: '',
    lastName: '',
    key: 0,
  });

  const userSelectedHandler = (user: UserInfoSimple) => {
    setUserSelected(user);
  };

  return (
    <Fragment>
      <Box px={7} py={9}>
        <Grid templateColumns="repeat(2,1fr)" gap="8">
          {keys.map((key) => {
            return (
              <UserList
                key={key}
                userRole={key}
                UsersInfoSimple={DUMMY_ARRAY[key]}
                onUserSelect={userSelectedHandler}
                onOpen={onOpen}
              />
            );
          })}
        </Grid>
      </Box>
      <UserModal isOpen={isOpen} onClose={onClose} userInfo={userSelected} />
    </Fragment>
  );
};

export default UserLists;
