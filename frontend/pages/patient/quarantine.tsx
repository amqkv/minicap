import { useSession, getSession } from "next-auth/react";
import { USER_ROLES } from "@frontend/utils/constants";
import { GetServerSideProps } from "next";
import {
    Heading,
    Text,
    Box,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
} from "@chakra-ui/react";
import NavLink from "@frontend/components/navigation/navlink";
import { otherLinks } from "@frontend/utils/quarantine-constants";
import { MAIN_COLOR } from "@frontend/utils/constants";
import { serverURL } from "@frontend/config/index";

export const getServerSideProps: GetServerSideProps = async context => {
    let session = await getSession(context);
    let accountId = session?.user.AccountId;
    let hasCovid = false;

    try {
        let response: any = await fetch(serverURL + "/patients/isPositive/" + accountId);
        hasCovid = await response.json();
    } catch {}

    return {
        props: {
            session,
            hasCovid,
        },
    };
};

//we just stole everything from https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/quarantine-isolate-home.html

export default function Quarantine({ hasCovid }: { hasCovid: boolean }) {
    const { data: session } = useSession();

    // display the page only if the patient has covid
    if (session?.user.Role === USER_ROLES.patient && hasCovid) {
        return (
            <Box margin={{ base: "15px", md: "5% 15%" }} paddingBottom={"20px"}>
                <Heading as="h1" size="xl" paddingBottom={"15px"}>
                    COVID-19: How to quarantine or isolate at home
                </Heading>
                {/* initial paragraph */}
                <Text fontSize="lg" paddingBottom="15px">
                    Quarantine or isolation can reduce the spread of COVID-19, including its variants, in your household
                    and community. That's why it's important to follow the advice of your local public health authority
                    about when and how to quarantine or isolate.
                </Text>

                <Heading as="h2" size="lg" paddingBottom={"15px"}>
                    On this page
                </Heading>

                {/* On this page */}
                <Box marginLeft="25px" paddingBottom={"15px"}>
                    <ul>
                        <NavLink
                            url="#travel"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Travel
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#quarantine"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Quarantine instructions
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#isolation"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Isolation instructions
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#wearingmask"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Wearing a mask
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#actionsfollow"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Actions to follow
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#actionsavoid"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li id="travel">
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Actions to avoid
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#ifdevelop"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    If you develop severe symptoms
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink
                            url="#group"
                            styleProps={{ padding: "0px", textDecoration: "underline" }}
                            textDecoration>
                            <li>
                                <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                    Group or co-living settings
                                </Text>
                            </li>
                        </NavLink>
                    </ul>
                </Box>

                {/*travel */}
                <Heading as="h2" size="lg" paddingBottom={"15px"}>
                    Travel
                </Heading>

                <Text fontSize="lg" paddingBottom={"15px"} id="quarantine">
                    If you've travelled outside of Canada recently, advice for your quarantine or isolation period may
                    be different.
                    <NavLink
                        passHref
                        url="https://travel.gc.ca/travel-covid"
                        styleProps={{ padding: "0px", textDecoration: "underline" }}
                        textDecoration>
                        <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                            Consult COVID-19: Travel, testing and borders
                        </Text>
                    </NavLink>
                </Text>

                {/* quarantine instructions */}
                <Box paddingBottom={"20px"}>
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Quarantine instructions
                    </Heading>

                    <Text fontSize="lg" paddingBottom={"10px"}>
                        You can transmit COVID-19 before you start showing symptoms or without ever developing symptoms.
                        <br />
                        You may need to quarantine if you:
                    </Text>
                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    have <b>no</b> symptoms <b>and</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    had an exposure to someone who has been diagnosed with or may have COVID-19
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        There may be different quarantine requirements if you or any of your other household members are
                        vaccinated against COVID-19. Follow the instructions from your local public health authority.
                        <br />
                        If you've been tested for COVID-19 and are waiting for your results, you <b>must</b> quarantine
                        until:
                    </Text>

                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    you have received negative results <b>or</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    your local public health authority has advised that you no longer need to quarantine
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        Quarantine means that you <b>must</b>:
                    </Text>

                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    stay in your home or co-living setting and monitor yourself for any COVID-19
                                    symptom, even if mild
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    record your temperature daily or as directed by your local public health authority
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    avoid using fever-reducing medications as much as possible, such as acetaminophen or
                                    ibuprofen, as these medications could hide an early symptom of COVID-19
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    follow advice from your local public health authority for instructions on testing
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        If you're in quarantine and start to develop symptoms, you must:
                    </Text>

                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    isolate yourself away from others as soon as you notice even one mild symptom
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg"> wear a medical mask </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            if unavailable, wear a well-constructed and well-fitting non-medical mask
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize="lg">
                                    contact your health care provider or local public health authority for instructions{" "}
                                    <b>right away</b>
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"} id="isolation">
                        Learn more about:
                    </Text>

                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms/provincial-territorial-resources-covid-19.html"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li>
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        Contact your local public health authority
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li>
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        COVID-19 mask use: Advice for community settings
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Isolation Instructions */}
                <Box paddingBottom={"20px"}>
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Isolation Instructions
                    </Heading>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        You need to isolate in your home or co-living setting if <b>any</b> of the following apply to
                        you:
                    </Text>
                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    you've been diagnosed with COVID-19, whether you have symptoms or not
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    you have <b>any</b> symptom of COVID-19, even if mild, and have:
                                </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            had an exposure to someone who has been diagnosed with or may have COVID-19{" "}
                                            <b>or</b>
                                        </Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">
                                            been tested for COVID-19 and are waiting to hear the results <b>or</b>
                                        </Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">
                                            been told by your local public health authority that you need to isolate
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        Isolation means that you <b>must:</b>
                    </Text>
                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">go directly to and stay in your home or co-living setting</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">monitor your symptoms as directed by:</Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">your health care provider or</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">your local public health authority</Text>
                                    </li>
                                    <Box marginLeft="25px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">
                                                    ensure you follow their advice for when you're no longer at risk of
                                                    spreading COVID-19 to others
                                                </Text>
                                            </li>
                                        </ul>
                                    </Box>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize="lg">
                                    immediately contact your health care provider or local public health authority and
                                    follow their instructions if your symptoms get worse
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    follow advice from your local public health authority for instructions on testing
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        If you're isolating at home, your household members may need to quarantine after their last
                        exposure to you. Your local public health authority will determine their length of quarantine
                        based on a variety of factors, including:
                    </Text>
                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    vaccination status <b>and</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    how well they can separate from you in your home or co-living setting (like whether
                                    you have access to a separate bedroom and washroom)
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" id="wearingmask">
                        Learn more about:
                    </Text>
                    <Box marginLeft="25px" paddingBottom={"15px"}>
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms.html#s"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li>
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        COVID-19 symptoms
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms/provincial-territorial-resources-covid-19.html"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li>
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        Contact your local public health authority
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Wearing a mask accordion 3 components*/}
                <Box paddingBottom={"20px"}>
                    <Box>
                        <Heading as="h2" size="lg" paddingBottom={"15px"}>
                            Wearing a mask
                        </Heading>
                    </Box>
                    <div id="actionsfollow"></div>
                    <Box>
                        <Accordion allowMultiple>
                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            <Text fontSize="lg">Quarantine</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize="lg">
                                        If you're in quarantine and do <b>not</b> live with the person who exposed you
                                        to COVID-19, wear a well-constructed and well-fitting <b>non-medical mask</b>{" "}
                                        when:
                                    </Text>
                                    <Box marginLeft="25px" paddingBottom="15px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">
                                                    alone or with others in shared indoor spaces, like
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">hallways</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">the kitchen</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">washrooms</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                    </Box>

                                    <Box marginLeft="25px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">
                                                    your household members are with you in a private outdoor space,
                                                    like:
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">a balcony</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">the backyard</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                    </Box>

                                    <Box marginLeft="25px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">
                                                    you need care (either direct physical care or close-range
                                                    interactions)
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">
                                                            your caregiver should also wear a non-medical mask
                                                        </Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                    </Box>

                                    <NavLink
                                        passHref
                                        url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/quarantine-isolate-home.html"
                                        styleProps={{ padding: "0px", textDecoration: "underline" }}
                                        textDecoration>
                                        <Text _hover={{ color: MAIN_COLOR }} fontSize="lg" paddingBottom="15px">
                                            What to do if you're in quarantine and start to develop severe symptoms.
                                        </Text>
                                    </NavLink>
                                    <Text fontSize="lg">Learn more about:</Text>
                                    <Box marginLeft="25px" paddingBottom="15px">
                                        <ul>
                                            <NavLink
                                                passHref
                                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                                textDecoration>
                                                <li>
                                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                                        COVID-19 mask use: Advice for community settings
                                                    </Text>
                                                </li>
                                            </NavLink>
                                        </ul>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            <Text fontSize="lg">Isolation</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize="lg">
                                        If you're in isolation, wear a <b>medical mask</b> when:
                                    </Text>
                                    <Box marginLeft="25px" paddingBottom="15px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">
                                                    alone or with others in shared indoor spaces, like:
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">hallways</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">the kitchen</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">washrooms</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <li>
                                                <Text fontSize="lg">
                                                    your household members are with you in a private outdoor space,
                                                    like:
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">a balcony</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize="lg">the backyard</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <li>
                                                <Text fontSize="lg">
                                                    you need care (either direct physical care or close-range
                                                    interactions)
                                                </Text>
                                            </li>
                                            <Box marginLeft="25px" paddingBottom="15px">
                                                <ul>
                                                    <li>
                                                        <Text fontSize="lg">
                                                            your caregiver should also wear a medical mask
                                                        </Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                        <Text fontSize="lg">
                                            If you must share a space with your household members, they should wear a
                                            well-constructed and well-fitting <b>non-medical mask</b> or{" "}
                                            <b>medical mask.</b>
                                        </Text>
                                        <Text fontSize="lg">
                                            Household members may be at risk of more severe disease or outcomes from
                                            COVID-19. These members should wear a medical mask when sharing an indoor or
                                            outdoor space with you. If a medical mask is recommended but not available,
                                            wear a well-constructed and well-fitting non-medical mask.
                                        </Text>
                                        <Text fontSize="lg">Learn more about:</Text>
                                        <Box marginLeft="25px" paddingBottom="15px">
                                            <ul>
                                                <NavLink
                                                    passHref
                                                    url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                                    styleProps={{ padding: "0px", textDecoration: "underline" }}
                                                    textDecoration>
                                                    <li>
                                                        <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                                            COVID-19 mask use: Advice for community settings
                                                        </Text>
                                                    </li>
                                                </NavLink>
                                                <NavLink
                                                    passHref
                                                    url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html#people"
                                                    styleProps={{ padding: "0px", textDecoration: "underline" }}
                                                    textDecoration>
                                                    <li>
                                                        <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                                            People who are at risk of more severe disease or outcomes
                                                            from COVID-19
                                                        </Text>
                                                    </li>
                                                </NavLink>
                                            </ul>
                                        </Box>
                                    </Box>
                                </AccordionPanel>
                            </AccordionItem>

                            <AccordionItem>
                                <h2>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            <Text fontSize="lg">Children</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize="lg">
                                        Children under the age of 2 years should not wear masks. Children 2 to 5 years
                                        old may be able to wear a mask if they:
                                    </Text>
                                    <Box marginLeft="25px" paddingBottom="15px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">are supervised</Text>
                                            </li>
                                            <li>
                                                <Text fontSize="lg">can tolerate it</Text>
                                            </li>
                                            <li>
                                                <Text fontSize="lg">know how to put it on and take it off</Text>
                                            </li>
                                        </ul>
                                    </Box>
                                    <Text fontSize="lg">
                                        Children older than 5 years should wear a mask in the same situations or
                                        settings as adults.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Box>

                {/* Actions to follow */}
                <Box paddingBottom="20px">
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Actions to follow
                    </Heading>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        If you're in quarantine or isolation, you should:
                    </Text>
                    <Box marginLeft="25px">
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    follow all advice and directions from your local public health authority
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    maintain the greatest physical distance possible with other household members
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">wear the right type of mask for the situation</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">keep your space properly ventilated</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">wash your hands often with soap and water</Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            use hand sanitizer that's at least 60% alcohol if soap and water aren't
                                            available
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize="lg">take precautions with your pets</Text>
                            </li>
                        </ul>
                    </Box>
                    <Box marginLeft="25px">
                        <ul>
                            <li>
                                <Text fontSize="lg">exercise at home</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">work from home if you can</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">rest and eat a balanced diet</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">walk your pet on your own property</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">if possible, have essentials delivered to you from a: </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">friend</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">neighbour</Text>
                                    </li>

                                    <li>
                                        <Text fontSize="lg">family member</Text>
                                    </li>
                                </ul>
                            </Box>
                            <li id="actionsavoid">
                                <Text fontSize="lg">go outside on your private balcony, deck or backyard</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    keep in touch with family and friends with technology, such as video calls
                                </Text>
                            </li>
                        </ul>
                    </Box>
                </Box>

                {/* Actions to avoid */}
                <Box paddingBottom="20px">
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Actions to avoid
                    </Heading>
                    <Text fontSize="lg" paddingBottom={"15px"}>
                        If you're in quarantine or isolation, do <b>not:</b>
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">visit public areas</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">go to work or school</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">visit friends or family</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">have guests over to your home</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    leave your home or co-living setting unless you need medical care
                                </Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom={"15px"}>
                        You should also avoid:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">in-person interactions</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">being in the same room as your household members</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">sharing private outdoor space with your household members</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    contact with people who are at risk of more severe disease or outcomes
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom={"15px"}>
                        Avoid activities that require being physically close to other household members, such as:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">shared meals</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">family games</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">watching television</Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize="lg" paddingBottom="15px">
                        Do <b>not</b> share personal items, such as:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">masks</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">towels</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">utensils</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">bed linen</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">toothbrushes</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">food and drink</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">electronic devices</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        If you're staying in a hotel for your quarantine or isolation, avoid shared public spaces, such
                        as:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">gyms</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">pools</Text>
                            </li>
                            <li id="ifdevelop">
                                <Text fontSize="lg">lobbies</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">restaurants</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">courtyards</Text>
                            </li>
                        </ul>
                    </Box>
                </Box>

                {/* If you develop severe symptoms */}
                <Box paddingBottom="20px">
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        If you develop severe symptoms
                    </Heading>
                    <Text fontSize="lg" paddingBottom="15px">
                        Call <b>911</b> or your local emergency number if you develop severe symptoms, such as:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">significant difficulty breathing</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">chest pain or pressure</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">new onset of confusion</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">difficulty waking up</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        If you call an ambulance, tell the dispatcher that you have or may have COVID-19.
                    </Text>
                    <Text fontSize="lg" paddingBottom="15px">
                        If you take a private vehicle to the hospital, call ahead to let them know that that you have or
                        may have COVID-19. If possible, only one healthy person should drive you.
                    </Text>
                    <Text fontSize="lg" paddingBottom="15px">
                        While in the vehicle, follow personal preventive practices and:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">
                                    make sure all passengers are wearing a <b>medical mask</b>
                                </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            if unavailable, wear a <b>non-medical</b> mask that's well constructed and
                                            well fitting
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize="lg">if you're breathing well, you should also wear a mask</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    keep all of your car windows fully open if possible and safe to do so
                                </Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    sit in the back seat on the opposite side from the driver to put as much physical
                                    distance as possible between you
                                </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            in larger vehicles, sit in the furthest row away from the front
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        Do <b>not</b> use public transportation to seek medical care unless you have no choice.
                    </Text>
                    <Text fontSize="lg" paddingBottom="15px">
                        Learn more about:
                    </Text>
                    <Box marginLeft="25px">
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html#p"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li id="group">
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        COVID-19: Prevention for individuals
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                styleProps={{ padding: "0px", textDecoration: "underline" }}
                                textDecoration>
                                <li>
                                    <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                        COVID-19 mask use: Advice for community settings
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Group or co-living settings */}
                <Box paddingBottom="20px">
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Group or co-living settings
                    </Heading>

                    <Text fontSize="lg" paddingBottom="15px">
                        Avoid quarantine or isolation at home if you can't separate yourself from others, such as if
                        you:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text>share a small apartment</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">share a home with a cramped layout</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">live in the same household with large families or many people</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">
                                    live in a co-living setting where there's close interactions with others and you
                                    share common spaces, such as a:
                                </Text>
                            </li>
                            <Box marginLeft="25px" paddingBottom="15px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">shelter</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">group home</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">student residence</Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        It may also be difficult to quarantine or isolate if you:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">have care responsibilities for others</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">live in a multi-generational household</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">are a child or older adult who requires care</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        Your local public health authority may advise you to quarantine or isolate somewhere you won't
                        have to share:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">toilets</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">bathrooms</Text>
                            </li>
                            <li>
                                <Text fontSize="lg">a kitchen or cooking area</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize="lg" paddingBottom="15px">
                        Follow this advice by renting a hotel room or similar space, if you can.
                    </Text>
                    <Text fontSize="lg" paddingBottom="15px">
                        If you can't avoid close interactions with others, and you or your household members can't
                        relocate, you should use a separate:
                    </Text>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            <li>
                                <Text fontSize="lg">room for sleeping, or if not possible: </Text>
                            </li>
                            <Box marginLeft="25px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">
                                            sleep in a separate bed, positioned head-to-toe with others to keep as far
                                            away from one another as possible
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize="lg">washroom, or if not possible: </Text>
                            </li>
                            <Box marginLeft="25px" paddingBottom="15px">
                                <ul>
                                    <li>
                                        <Text fontSize="lg">open the window</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">put the toilet lid down before flushing</Text>
                                    </li>
                                    <li>
                                        <Text fontSize="lg">
                                            clean and disinfect surfaces and objects that have been touched after each
                                            use, like:
                                        </Text>
                                    </li>
                                    <Box marginLeft="25px" paddingBottom="15px">
                                        <ul>
                                            <li>
                                                <Text fontSize="lg">toilets</Text>
                                            </li>
                                            <li>
                                                <Text fontSize="lg">sink faucets</Text>
                                            </li>
                                            <li>
                                                <Text fontSize="lg">door handles</Text>
                                            </li>
                                        </ul>
                                    </Box>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                </Box>

                <Box paddingBottom="20px">
                    <Heading as="h2" size="lg" paddingBottom={"15px"}>
                        Related links
                    </Heading>
                    <Box marginLeft="25px" paddingBottom="15px">
                        <ul>
                            {otherLinks.map(({ url, text }) => (
                                <NavLink
                                    passHref
                                    styleProps={{ padding: "0px", textDecoration: "underline" }}
                                    url={url}
                                    textDecoration>
                                    <li>
                                        <Text _hover={{ color: MAIN_COLOR }} fontSize="lg">
                                            {text}
                                        </Text>
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </Box>
                </Box>
            </Box>
        );
    }
    return <p>Access Denied</p>;
}
