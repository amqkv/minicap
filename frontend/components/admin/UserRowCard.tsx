import { Box, ListItem, Text } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';
import UserInfoSimple from '@frontend/models/UserInfoSimple';
import classes from './UserRowCard.module.css';
interface AppProps {
  onUserSelect: ({}: UserInfoSimple) => void;
  UserInfoSimple: UserInfoSimple;
  onOpen: () => void;
}

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});
const UserRowCard = ({ onUserSelect, UserInfoSimple, onOpen }: AppProps) => {
  const onClickHandler = () => {
    onUserSelect(UserInfoSimple);
    onOpen();
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
        {/* <Text
          fontFamily={'Poppins'}
          fontStyle={'18px'}
          fontSize={'normal'}
          fontWeight={600}
          lineHeight={'42px'}
          letterSpacing={'0em'}
          textAlign={'left'}
        >
          {UserInfoSimple.LastName}, {UserInfoSimple.FirstName}
        </Text> */}
      </Box>
    </ListItem>
  );
};

export default UserRowCard;
