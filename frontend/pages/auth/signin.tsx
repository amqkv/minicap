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
      <Box w="60%" h="100%" p="20px" display={{base: 'none', md: 'initial'}}>
        <Img
          src="https://i.imgur.com/DAXn8BT.png"
          w="100%"
          alt="Login picture"
        />
      </Box>

      <Box w={{base: '100%', md: '40%'}} h="100%" p="20px">
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
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  <Input name="email" placeholder="Enter Email" label="Email" type="standard"/>
                  <Input name="password" placeholder="Enter Password" label="Password" type="password"/>
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
              <Box marginBottom={"20px"}>
                <span>First Name</span>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Flex>
  );
}
