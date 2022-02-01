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
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

import UserInfoSimple from '@frontend/models/UserInfoSimple';
import { useState } from 'react';
import { mutate } from 'swr';
import classes from './UserModal.module.css';

interface appProps {
  userInfo: UserInfoSimple;
  isOpen: boolean;
  onClose: () => void;
}

const breakpoints = createBreakpoints({
  sm: '30em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
});

const UserModal = ({ userInfo, isOpen, onClose }: appProps) => {
  const [role, setRole] = useState('');

  const roleSelectHandler = (event: string) => {
    setRole(event);
  };

  const roleSubmitHandler = async () => {
    onClose();
    const response = await fetch('/api/users/role', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        AccountId: userInfo.AccountId,
        OldRole: userInfo.Role,
        NewRole: role,
      }),
    });
    // Call for other fetches with SWR to revalidate the data using this route
    mutate('/api/users/role');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={'45rem'}>
        <ModalHeader px={6} paddingTop={4} paddingBottom={0}>
          <Flex align="right" justify="right">
            <CloseButton size="md" onClick={onClose} />
          </Flex>
          <p className={classes.modalHeader}>
            {userInfo.LastName}, {userInfo.FirstName}
          </p>
        </ModalHeader>
        <ModalBody pt={0}>
          <Box my={1} className={classes.selectionFont}>
            {' '}
            User Role:
          </Box>
          <Center>
            <RadioGroup name="role" onChange={roleSelectHandler} my={2}>
              <Stack
                direction={['column', 'column', 'row', 'row']}
                spacing={5}
                className={classes.roleFont}
              >
                <Radio value="Patient">Patient</Radio>
                <Radio value="Doctor">Doctor</Radio>
                <Radio value="HealthOfficial">Health Official</Radio>
                <Radio value="ImmigrationOfficer">Immigration Officer</Radio>
                <Radio value="Admin">Admin</Radio>
              </Stack>
            </RadioGroup>
          </Center>
        </ModalBody>

        <ModalFooter>
          <Button
            backgroundColor={'#FF4545BD'}
            onClick={roleSubmitHandler}
            className={classes.applyButton}
          >
            <Box className={classes.buttonFont}>Apply</Box>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserModal;
