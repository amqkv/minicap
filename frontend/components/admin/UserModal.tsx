import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Box,
  Center,
} from '@chakra-ui/react';
import classes from './UserModal.module.css';

interface appProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal = ({ isOpen, onClose }: appProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'45rem'}>
        <ModalHeader px={6} paddingTop={4} paddingBottom={0}>
          <p className={classes.modalHeader}>LastName, First Name</p>
        </ModalHeader>
        <ModalBody pt={0}>
          <Box my={1} className={classes.selectionFont}>
            User Role:
          </Box>
          <Center>
            <RadioGroup my={2}>
              <Stack direction="row" spacing={5} className={classes.roleFont}>
                <Radio value="1">Patient</Radio>
                <Radio value="2">Doctor</Radio>
                <Radio value="3">Health Official</Radio>
                <Radio value="4">Immigration Officer</Radio>
                <Radio value="5">Admin</Radio>
              </Stack>
            </RadioGroup>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button backgroundColor={'#FF4545BD'}>
            <Box className={classes.buttonFont}>Apply</Box>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
