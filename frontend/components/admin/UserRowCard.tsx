import { Box, ListItem, Text } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import classes from './UserRowCard.module.css';
interface AppProps {
  onUserSelect: ({}: UserInfoSimple) => void;
  UserInfoSimple: UserInfoSimple;
}

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

// TODO Generalize Card component to reuse with Doctor-Patient Admin page
const UserRowCard = ({ onUserSelect, UserInfoSimple }: AppProps) => {
  const onClickHandler = () => {
    onUserSelect(UserInfoSimple);
  };

  return (
    <ListItem paddingEnd={4} py={2}>
      <Box
        className={classes.cardShadow}
        w={'full'}
        rounded={'md'}
        paddingStart={14}
        py={3}
        display={{ md: 'flex' }}
        onClick={onClickHandler}
      >
        <p className={classes.rowFont}>
          {UserInfoSimple.LastName}, {UserInfoSimple.FirstName}
        </p>
      </Box>
    </ListItem>
  );
};

export default UserRowCard;
