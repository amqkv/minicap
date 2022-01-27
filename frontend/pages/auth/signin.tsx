import { getCsrfToken } from "next-auth/react";
import { Flex, Box, Img, Button, Heading, Tabs, Tab, TabList, TabPanel, TabPanels, Select } from "@chakra-ui/react";
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
    <Flex p={{base: "0px", md: "50px"}}>
      <Box w="55%" h="100%" p="20px" display={{ base: "none", md: "initial" }}>
        <Img src="https://i.imgur.com/DAXn8BT.png" w="100%" alt="Login picture" />
      </Box>

      <Box w={{ base: "100%", md: "45%" }} h="100%" p={{base: "10px", md: "20px"}}>
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

                <form method="post" action="/api/auth/callback/credentials">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <Input name="email" placeholder="Enter Email" label="Email" type="standard" />
                  <Input name="password" placeholder="Enter Password" label="Password" type="password" />
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
                <Heading as="h2" marginBottom="20px" display={"inline-block"} fontWeight={600} textAlign={"center"}>
                  Create your account
                </Heading>
                <form>
                  <Box display={"flex"} flexDirection={"row"} flexWrap={"wrap"} w={"100%"}>
                    <Box display={"flex"} flexDirection={"column"} flexBasis="100%" flex="1" marginLeft={"10px"}>
                      <Input name="First Name"  label="First Name" type="standard" />
                      <Input name="Email"  label="Email" type="standard" />
                      <Input name="Password" label="Password" type="password" />
                      <Input name="DateOfBirth" label="Date of Birth" type="date"/>
                    </Box>
                    <Box display={"flex"} flexDirection={"column"} flexBasis="100%" flex="1" marginLeft={"10px"}>
                      <Input name="Last Name" label="Last Name" type="standard" />
                      <Input name='Gender' label='Gender' options={['Male', 'Female', 'Rather not say']} type='dropdown'/>
                      <Input name="Confirm Password"  label="Confirm Password" type="password" />
                      <Input name='Account role' label='Account role' options={['Doctor', 'Health Official', 'Immigration Officer', 'Patient']} type='dropdown'/>
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
