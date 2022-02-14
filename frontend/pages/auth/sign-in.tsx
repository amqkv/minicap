import { getCsrfToken, signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Flex,
  Box,
  Img,
  Button,
  Heading,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  useToast,
  UseToastOptions,
} from '@chakra-ui/react';
import { MAIN_COLOR, USER_ROLES_SIGN_IN } from '@frontend/utils/constants';
import PasswordInput from '@frontend/components/inputs/password-input';
import StandardInput from '@frontend/components/inputs/standard-input';
import DateInput from '@frontend/components/inputs/date-input';
import DropdownInput from '@frontend/components/inputs/dropdown-input';
import {
  validPassword,
  validEmail,
  validPhoneNumber,
  validPostalCode,
  allFieldsFilled,
} from '@frontend/utils/validation';
import { signUp } from '@frontend/functions/sign-up';
import {
  registerGeneralErrorPopup,
  registerSuccessPopup,
  signinErrorPopup,
  registerEmailErrorPopup,
} from '@frontend/utils/popups';

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const toast = useToast();
  const callPopup = (props: UseToastOptions) => !toast.isActive('popup') && toast({ ...props, id: 'popup' });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [postalError, setPostalError] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  async function handleSignIn(event: any) {
    event.preventDefault();

    const email = event.target[1].value;
    const password = event.target[2].value;

    if (email && password) {
      const { ok } = (await signIn('credentials', { redirect: false, email, password })) as any;

      ok && router.push('/') && toast.closeAll();
      !ok && callPopup(signinErrorPopup);
    }
  }

  async function handleRegister(event: any) {
    event.preventDefault();
    console.log(typeof event);

    const registerValues = {
      firstName: event.target[0].value,
      email: event.target[1].value,
      password: event.target[2].value,
      dateOfBirth: event.target[4].value,
      address: event.target[5].value,
      postalCode: event.target[6].value,
      lastName: event.target[7].value,
      gender: event.target[8].value,
      confirmPassword: event.target[9].value,
      accountRole: event.target[11].value,
      city: event.target[12].value,
      phoneNumber: event.target[13].value,
    };

    let error = false;

    if (registerValues.password !== registerValues.confirmPassword) {
      setConfirmPasswordError(true);
      error = true;
    } else setConfirmPasswordError(false);

    if (!validPassword(registerValues.password)) {
      setPasswordError(true);
      error = true;
    } else setPasswordError(false);

    if (!validEmail(registerValues.email)) {
      setEmailError(true);
      error = true;
    } else setEmailError(false);

    if (!validPostalCode(registerValues.postalCode)) {
      setPostalError(true);
      error = true;
    } else setPostalError(false);

    if (!validPhoneNumber(registerValues.phoneNumber)) {
      setPhoneError(true);
      error = true;
    } else {
      setPhoneError(false);
    }

    if (error || !allFieldsFilled(registerValues)) {
      callPopup(registerGeneralErrorPopup);
    } else {
      try {
        const { ok } = await signUp(registerValues);

        if (ok) {
          callPopup(registerSuccessPopup);
          setTabIndex(0);
        } else throw 'Error';
      } catch (errr) {
        callPopup(registerEmailErrorPopup);
      }
    }
  }

  return (
    <Flex p={{ base: '0px', md: '50px' }}>
      <Box w="55%" h="100%" p="20px" display={{ base: 'none', md: 'initial' }}>
        <Img src="https://i.imgur.com/DAXn8BT.png" w="100%" alt="Login picture" />
      </Box>

      <Box w={{ base: '100%', md: '45%' }} h="100%" p={{ base: '5px', md: '20px' }}>
        <Tabs isFitted isLazy colorScheme="pink" index={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Sign in</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w="100%" border={'none'}>
                <Heading as="h2" marginBottom="20px" display={'inline-block'} fontWeight={600} textAlign={'center'}>
                  Login to your account
                </Heading>
                <form onSubmit={handleSignIn}>
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <StandardInput name="email" placeholder="Enter Email" label="Email" />
                  <PasswordInput name="password" placeholder="Enter Password" label="Password" />
                  <Button
                    marginTop="20px"
                    w="40%"
                    color={'white'}
                    backgroundColor={MAIN_COLOR}
                    _hover={{ opacity: '80%' }}
                    alignItems={'center'}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box marginBottom={'10px'}>
                <Heading as="h2" marginBottom="20px" display={'inline-block'} fontWeight={600} textAlign={'center'}>
                  Create your account
                </Heading>
                <form onSubmit={handleRegister}>
                  <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} w={'100%'}>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      flexBasis="100%"
                      flex="1"
                      marginLeft={'10px'}>
                      <StandardInput
                        name="First Name"
                        placeholder="Enter First Name"
                        label="First Name"
                      />
                      <StandardInput
                        name="Email"
                        placeholder="Enter Email"
                        label="Email"
                        error={emailError}
                      />
                      <PasswordInput
                        name="Password"
                        placeholder="Enter Password"
                        label="Password"
                        error={passwordError}
                      />
                      <DateInput name="DateOfBirth" label="Date of Birth" />
                      <StandardInput name="Address" placeholder="Enter Address" label="Address" />
                      <StandardInput
                        name="PostalCode"
                        placeholder="Enter Postal Code"
                        label="Postal Code"
                        error={postalError}
                      />
                    </Box>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      flexBasis="100%"
                      flex="1"
                      marginLeft={'10px'}>
                      <StandardInput
                        name="Last Name"
                        placeholder="Enter Last Name"
                        label="Last Name"
                      />
                      <DropdownInput
                        placeholder="Select Gender"
                        name="Gender"
                        label="Gender"
                        options={['Male', 'Female', 'Rather not say']}
                      />
                      <PasswordInput
                        name="Confirm Password"
                        placeholder="Enter Password Again"
                        label="Confirm Password"
                        error={confirmPasswordError}
                      />
                      <DropdownInput
                        placeholder="Select Account Role"
                        name="Account Role"
                        label="Account Role"
                        options={USER_ROLES_SIGN_IN}
                      />
                      <StandardInput name="City" placeholder="Enter City" label="City" />
                      <StandardInput
                        name="PhoneNumber"
                        placeholder="Enter Phone Number"
                        label="Phone Number"
                        error={phoneError}
                      />
                    </Box>
                  </Box>
                  <Box marginTop="20px" alignItems={'center'} justifyContent={'center'}>
                    <Button
                      w="40%"
                      color={'white'}
                      backgroundColor={MAIN_COLOR}
                      _hover={{ opacity: '80%' }}
                      type="submit"
                    >
                      Signup
                    </Button>
                  </Box>
                </form>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}