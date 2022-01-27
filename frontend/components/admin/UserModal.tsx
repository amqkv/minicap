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
  Center,
} from '@chakra-ui/react';

interface appProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserModal = ({ isOpen, onClose }: appProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'45rem'}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>
          <h1>User Role:</h1>
          <Center>
            <RadioGroup>
              <Stack direction="row" spacing={5}>
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
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
