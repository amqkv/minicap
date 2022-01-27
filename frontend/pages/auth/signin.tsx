import { getCsrfToken, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
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
  Select,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

import { mainColor } from "@frontend/utils/constants";
import PasswordInput from "@frontend/components/inputs/PasswordInput";
import StandardInput from "@frontend/components/inputs/StandardInput";
import DateInput from "@frontend/components/inputs/DateInput";
import DropdownInput from "@frontend/components/inputs/DropdownInput";
import { serverURL } from "@frontend/config/index";

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  const router = useRouter();
  const errorPopup = useToast();
  const callErrorPopup = (props: UseToastOptions) =>
    !errorPopup.isActive("error") && errorPopup({ ...props, id: "error" });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  async function handleSignIn(event: any) {
    event.preventDefault();

    const email = event.target[1].value;
    const password = event.target[2].value;

    if (email && password) {
      const { ok } = (await signIn("credentials", { redirect: false, email, password })) as any;
      ok && router.push("/") && errorPopup.closeAll();
      !ok &&
        errorPopup({
          title: "Error!",
          description: `There was an error in login. Try again`,
          status: "error",
          isClosable: true,
          position: "top",
        });
    }
  }

  async function handleSignUp(event: any) {
    event.preventDefault();

    const firstName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const dateOfBirth = event.target[4].value;
    const lastName = event.target[5].value;
    const gender = event.target[6].value;
    const confirmPassword = event.target[7].value;
    const accountRole = event.target[9].value;

    const errorPopupProps: UseToastOptions = {
      title: "Error!",
      status: "error",
      isClosable: true,
      position: "top",
    };
    const errorDescription = `There is an error with your email or password. Try again`;
    const missingFieldDescription = "There is a missing field in the form. Try again";
    let error = false;

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      error = true;
    } else {
      setConfirmPasswordError(false);
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)) {
      setPasswordError(true);
      error = true;
    } else {
      setPasswordError(false);
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(true);
      error = true;
    } else {
      setEmailError(false);
    }

    let today = new Date().toISOString().slice(0, 10);

    if (error) {
      callErrorPopup({ ...errorPopupProps, description: errorDescription });
    } else if (
      !firstName ||
      !email ||
      !password ||
      dateOfBirth === today ||
      !lastName ||
      !gender ||
      !confirmPassword ||
      !accountRole
    ) {
      callErrorPopup({ ...errorPopupProps, description: missingFieldDescription });
    } else {
      const res = await fetch(serverURL + "/users/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          birthDate: dateOfBirth,
          address: "",
          city: "",
          email: email,
          password: password,
          phoneNumber: "",
          // role: accountRole;
        }),
        headers: { "Content-Type": "application/json" },
      });
      // console.log(res);
    }
  }

  return (
    <Flex p={{ base: "0px", md: "50px" }}>
      <Box w="55%" h="100%" p="20px" display={{ base: "none", md: "initial" }}>
        <Img src="https://i.imgur.com/DAXn8BT.png" w="100%" alt="Login picture" />
      </Box>

      <Box w={{ base: "100%", md: "45%" }} h="100%" p={{ base: "10px", md: "20px" }}>
        <Tabs isFitted isLazy colorScheme="pink">
          <TabList>
            <Tab>Sign in</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w="100%" border={"none"}>
                <Heading as="h2" marginBottom="20px" display={"inline-block"} fontWeight={600} textAlign={"center"}>
                  Login to your account
                </Heading>
                <form onSubmit={handleSignIn}>
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <StandardInput name="email" placeholder="Enter Email" label="Email" />
                  <PasswordInput name="password" placeholder="Enter Password" label="Password" />
                  <Button
                    marginTop="20px"
                    w="40%"
                    color={"white"}
                    backgroundColor={mainColor}
                    _hover={{ opacity: "80%" }}
                    alignItems={"center"}
                    type="submit"
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box marginBottom={"10px"}>
                <Heading as="h2" marginBottom="20px" display={"inline-block"} fontWeight={600} textAlign={"center"}>
                  Create your account
                </Heading>
                <form onSubmit={handleSignUp}>
                  <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} w={"100%"}>
                    <Box display={"flex"} flexDirection={"column"} flexBasis="100%" flex="1" marginLeft={"10px"}>
                      <StandardInput name="First Name" placeholder="Enter First Name" label="First Name" />
                      <StandardInput name="Email" placeholder="Enter Email" label="Email" error={emailError} />
                      <PasswordInput
                        name="Password"
                        placeholder="Enter Password"
                        label="Password"
                        error={passwordError}
                      />
                      <DateInput name="DateOfBirth" label="Date of Birth" />
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} flexBasis="100%" flex="1" marginLeft={"10px"}>
                      <StandardInput name="Last Name" placeholder="Enter Last Name" label="Last Name" />
                      <DropdownInput
                        placeholder="Select Gender"
                        name="Gender"
                        label="Gender"
                        options={["Male", "Female", "Rather not say"]}
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
                        options={["Doctor", "Health Official", "Immigration Officer", "Patient"]}
                      />
                    </Box>
                  </Box>
                  <Box marginTop="20px" alignItems={"center"} justifyContent={"center"}>
                    <Button
                      w="40%"
                      color={"white"}
                      backgroundColor={mainColor}
                      _hover={{ opacity: "80%" }}
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
