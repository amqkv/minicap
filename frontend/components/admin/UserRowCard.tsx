import { Box, ListItem } from '@chakra-ui/react';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import classes from './UserRowCard.module.css';
interface AppProps {
  onUserSelect: ({}: UserInfoSimple) => void;
  UserInfoSimple: UserInfoSimple;
  onOpen: () => void;
}
const UserRowCard = ({ onUserSelect, UserInfoSimple, onOpen }: AppProps) => {
  const onClickHandler = () => {
    onUserSelect(UserInfoSimple);
    onOpen();
  };

  return (
    <Box paddingEnd={4} py={2}>
      <ListItem>
        <Box
          className={classes.cardShadow}
          w={'full'}
          rounded={'md'}
          paddingStart={14}
          py={3}
          onClick={onClickHandler}
        >
          <p className={classes.rowFont}>
            {UserInfoSimple.LastName}, {UserInfoSimple.FirstName}
          </p>
        </Box>
      </ListItem>
    </Box>
  );
};

export default UserRowCard;
