import { Box, ListItem } from '@chakra-ui/react';
import classes from './UserRowCard.module.css';
interface AppProps {
  onOpen: () => void;
}
const UserRowCard = ({ onOpen }: AppProps) => {
  return (
    <Box paddingEnd={4} py={2}>
      <ListItem>
        <Box
          className={classes.cardShadow}
          w={'full'}
          rounded={'md'}
          paddingStart={14}
          py={3}
          onClick={onOpen}
        >
          <p className={classes.rowFont}>Last Name, First Name</p>
        </Box>
      </ListItem>
    </Box>
  );
};

export default UserRowCard;
