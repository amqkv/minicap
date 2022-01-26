import { Box, ListItem } from '@chakra-ui/react';
import classes from './UserRowCard.module.css';

const UserRowCard = () => {
  return (
    <Box paddingEnd={4} py={2}>
      <ListItem>
        <Box
          className={classes.cardShadow}
          w={'full'}
          rounded={'md'}
          paddingStart={14}
          py={3}
        >
          <p className={classes.rowFont}>Last Name, First Name</p>
        </Box>
      </ListItem>
    </Box>
  );
};

export default UserRowCard;
