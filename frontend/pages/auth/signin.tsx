import { getCsrfToken } from "next-auth/react";
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
} from "@chakra-ui/react";
import { mainColor } from "@frontend/utils/constants";
import Input from "@frontend/components/inputs/InputFactory";

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default function SignIn({ csrfToken }: any) {
  return (
    <Flex p="50px">
      <Box w="55%" h="100%" p="20px" display={{ base: "none", md: "initial" }}>
        <Img
          src="https://i.imgur.com/DAXn8BT.png"
          w="100%"
          alt="Login picture"
        />
      </Box>

      <Box w={{ base: "100%", md: "45%" }} h="100%" p="20px">
        <Tabs isFitted isLazy colorScheme="pink">
          <TabList>
            <Tab>Sign in</Tab>
            <Tab>Register</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w="100%" border={"none"}>
                <Heading
                  as="h2"
                  marginBottom="20px"
                  display={"inline-block"}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  Login to your account
                </Heading>

                <form method="post" action="/api/auth/callback/credentials">
                  {/* This input is useless? or used to send back to the backend */}
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <Input
                    name="email"
                    placeholder="Enter Email"
                    label="Email"
                    type="standard"
                  />
                  <Input
                    name="password"
                    placeholder="Enter Password"
                    label="Password"
                    type="password"
                  />
                  <Button
                    marginTop="20px"
                    w="40%"
                    color={"white"}
                    backgroundColor={mainColor}
                    _hover={{ opacity: "80%" }}
                    type="submit"
                    alignItems={"center"}
                  >
                    Login
                  </Button>
                </form>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box marginBottom={"10px"}>
                <Heading
                  as="h2"
                  marginBottom="20px"
                  display={"inline-block"}
                  fontWeight={600}
                  textAlign={"center"}
                >
                  Create your account
                </Heading>
                <Box w={"40%"}>
                  <Input
                    name="First Name"
                    placeholder=""
                    label="First Name"
                    type="standard"
                  />
                  <Input
                    name="Last Name"
                    placeholder=""
                    label="Last Name"
                    type="standard"
                  />
                  <Input
                    name="Email"
                    placeholder=""
                    label="Email"
                    type="standard"
                  />
                  <Input
                    name="Password"
                    placeholder=""
                    label="Password"
                    type="password"
                  />
                  <Input
                    name="Confirm Password"
                    placeholder=""
                    label="Confirm Password"
                    type="password"
                  />
                  <Input
                    name="Gender"
                    placeholder=""
                    label="Gender"
                    type="gender"
                  />
                  <Input
                    name="Account role"
                    placeholder=""
                    label="Account Role"
                    type="role"
                  />
                </Box>
                {/* <Box w={"40%"}>
                  <Input
                    name="Date of Birth"
                    placeholder=""
                    label="Date of Birth"
                    type="date"
                  />
                </Box> */}
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
