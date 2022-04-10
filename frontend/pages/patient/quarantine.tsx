import { useSession, getSession } from "next-auth/react";
import { MAIN_COLOR, USER_ROLES } from "@frontend/utils/constants";
import { GetServerSideProps } from "next";
import {
    Box,
    Heading,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Text,
} from "@chakra-ui/react";
import NavLink from "@frontend/components/navigation/navlink";
import { otherLinks } from "@frontend/utils/quarantine-constants";

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await getSession(context);

    return {
        props: {
            session,
            pageId: "COVID-19: How to quarantine or isolate at home",
        },
    };
};

//we just stole everything from https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/quarantine-isolate-home.html

export default function Quarantine() {
    const { data: session } = useSession();
    const linkStyling = { padding: "0px", textDecoration: "underline" };
    const hoverColor = { color: MAIN_COLOR };

    const paddingList = "15px";
    const paddingSection = "20px";
    const fontSize = "lg";
    const marginLeft = "25px";
    const headingSize = "lg";

    // display the page only if the patient has covid
    if (session?.user.Role === USER_ROLES.patient) {
        return (
            <Box margin={{ base: paddingList, md: "5% 15%" }} paddingBottom={paddingSection}>
                <Text fontSize={fontSize} paddingBottom={paddingList}>
                    The information on this page was taken from:
                    <NavLink
                        passHref
                        url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms/provincial-territorial-resources-covid-19.html"
                        styleProps={linkStyling}
                        textDecoration>
                        <Text _hover={hoverColor} fontSize={fontSize}>
                            the Government of Canada
                        </Text>
                    </NavLink>
                </Text>

                {/* initial paragraph */}
                <Text fontSize={fontSize} paddingBottom={paddingList}>
                    Quarantine or isolation can reduce the spread of COVID-19, including its variants, in your household
                    and community. Thats why it&apos;s important to follow the advice of your local public health
                    authority about when and how to quarantine or isolate.
                </Text>

                <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                    On this page
                </Heading>

                {/* On this page */}
                <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                    <ul>
                        <NavLink url="#travel" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Travel
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#quarantine" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Quarantine instructions
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#isolation" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Isolation instructions
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#wearingmask" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Wearing a mask
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#actionsfollow" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Actions to follow
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#actionsavoid" styleProps={linkStyling} textDecoration>
                            <li id="travel">
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Actions to avoid
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#ifdevelop" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    If you develop severe symptoms
                                </Text>
                            </li>
                        </NavLink>
                        <NavLink url="#group" styleProps={linkStyling} textDecoration>
                            <li>
                                <Text _hover={hoverColor} fontSize={fontSize}>
                                    Group or co-living settings
                                </Text>
                            </li>
                        </NavLink>
                    </ul>
                </Box>

                {/*travel */}
                <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                    Travel
                </Heading>

                <Text fontSize={fontSize} paddingBottom={paddingList} id="quarantine">
                    If you&apos;ve travelled outside of Canada recently, advice for your quarantine or isolation period
                    may be different.
                    <NavLink passHref url="https://travel.gc.ca/travel-covid" styleProps={linkStyling} textDecoration>
                        <Text _hover={hoverColor} fontSize={fontSize}>
                            Consult COVID-19: Travel, testing and borders
                        </Text>
                    </NavLink>
                </Text>

                {/* quarantine instructions */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Quarantine instructions
                    </Heading>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        You can transmit COVID-19 before you start showing symptoms or without ever developing symptoms.
                        <br />
                        You may need to quarantine if you:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    have <b>no</b> symptoms <b>and</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    had an exposure to someone who has been diagnosed with or may have COVID-19
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        There may be different quarantine requirements if you or any of your other household members are
                        vaccinated against COVID-19. Follow the instructions from your local public health authority.
                        <br />
                        If you&apos;ve been tested for COVID-19 and are waiting for your results, you <b>must</b>{" "}
                        quarantine until:
                    </Text>

                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    you have received negative results <b>or</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    your local public health authority has advised that you no longer need to quarantine
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Quarantine means that you <b>must</b>:
                    </Text>

                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    stay in your home or co-living setting and monitor yourself for any COVID-19
                                    symptom, even if mild
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    record your temperature daily or as directed by your local public health authority
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    avoid using fever-reducing medications as much as possible, such as acetaminophen or
                                    ibuprofen, as these medications could hide an early symptom of COVID-19
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    follow advice from your local public health authority for instructions on testing
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you&apos;re in quarantine and start to develop symptoms, you must:
                    </Text>

                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    isolate yourself away from others as soon as you notice even one mild symptom
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}> wear a medical mask </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            if unavailable, wear a well-constructed and well-fitting non-medical mask
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize={fontSize}>
                                    contact your health care provider or local public health authority for instructions{" "}
                                    <b>right away</b>
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList} id="isolation">
                        Learn more about:
                    </Text>

                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms/provincial-territorial-resources-covid-19.html"
                                styleProps={linkStyling}
                                textDecoration>
                                <li>
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        Contact your local public health authority
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                styleProps={linkStyling}
                                textDecoration>
                                <li>
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        COVID-19 mask use: Advice for community settings
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Isolation Instructions */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Isolation Instructions
                    </Heading>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        You need to isolate in your home or co-living setting if <b>any</b> of the following apply to
                        you:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    you&apos;ve been diagnosed with COVID-19, whether you have symptoms or not
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    you have <b>any</b> symptom of COVID-19, even if mild, and have:
                                </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            had an exposure to someone who has been diagnosed with or may have COVID-19{" "}
                                            <b>or</b>
                                        </Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            been tested for COVID-19 and are waiting to hear the results <b>or</b>
                                        </Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            been told by your local public health authority that you need to isolate
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Isolation means that you <b>must:</b>
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    go directly to and stay in your home or co-living setting
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>monitor your symptoms as directed by:</Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>your health care provider or</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>your local public health authority</Text>
                                    </li>
                                    <Box marginLeft={marginLeft}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    ensure you follow their advice for when you&apos;re no longer at
                                                    risk of spreading COVID-19 to others
                                                </Text>
                                            </li>
                                        </ul>
                                    </Box>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize={fontSize}>
                                    immediately contact your health care provider or local public health authority and
                                    follow their instructions if your symptoms get worse
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    follow advice from your local public health authority for instructions on testing
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you&apos;re isolating at home, your household members may need to quarantine after their last
                        exposure to you. Your local public health authority will determine their length of quarantine
                        based on a variety of factors, including:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    vaccination status <b>and</b>
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    how well they can separate from you in your home or co-living setting (like whether
                                    you have access to a separate bedroom and washroom)
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} id="wearingmask">
                        Learn more about:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms.html#s"
                                styleProps={linkStyling}
                                textDecoration>
                                <li>
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        COVID-19 symptoms
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/symptoms/provincial-territorial-resources-covid-19.html"
                                styleProps={linkStyling}
                                textDecoration>
                                <li>
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        Contact your local public health authority
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Wearing a mask accordion 3 components*/}
                <Box paddingBottom={paddingSection}>
                    <Box>
                        <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
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
                                            <Text fontSize={fontSize}>Quarantine</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize={fontSize}>
                                        If you&apos;re in quarantine and do <b>not</b> live with the person who exposed
                                        you to COVID-19, wear a well-constructed and well-fitting{" "}
                                        <b>non-medical mask</b> when:
                                    </Text>
                                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    alone or with others in shared indoor spaces, like
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>hallways</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>the kitchen</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>washrooms</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                    </Box>

                                    <Box marginLeft={marginLeft}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    your household members are with you in a private outdoor space,
                                                    like:
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>a balcony</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>the backyard</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                    </Box>

                                    <Box marginLeft={marginLeft}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    you need care (either direct physical care or close-range
                                                    interactions)
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>
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
                                        styleProps={linkStyling}
                                        textDecoration>
                                        <Text _hover={hoverColor} fontSize={fontSize} paddingBottom={paddingList}>
                                            What to do if you&apos;re in quarantine and start to develop severe
                                            symptoms.
                                        </Text>
                                    </NavLink>
                                    <Text fontSize={fontSize}>Learn more about:</Text>
                                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                        <ul>
                                            <NavLink
                                                passHref
                                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                                styleProps={linkStyling}
                                                textDecoration>
                                                <li>
                                                    <Text _hover={hoverColor} fontSize={fontSize}>
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
                                            <Text fontSize={fontSize}>Isolation</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize={fontSize}>
                                        If you&apos;re in isolation, wear a <b>medical mask</b> when:
                                    </Text>
                                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    alone or with others in shared indoor spaces, like:
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>hallways</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>the kitchen</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>washrooms</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    your household members are with you in a private outdoor space,
                                                    like:
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>a balcony</Text>
                                                    </li>
                                                    <li>
                                                        <Text fontSize={fontSize}>the backyard</Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                            <li>
                                                <Text fontSize={fontSize}>
                                                    you need care (either direct physical care or close-range
                                                    interactions)
                                                </Text>
                                            </li>
                                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                                <ul>
                                                    <li>
                                                        <Text fontSize={fontSize}>
                                                            your caregiver should also wear a medical mask
                                                        </Text>
                                                    </li>
                                                </ul>
                                            </Box>
                                        </ul>
                                        <Text fontSize={fontSize}>
                                            If you must share a space with your household members, they should wear a
                                            well-constructed and well-fitting <b>non-medical mask</b> or{" "}
                                            <b>medical mask.</b>
                                        </Text>
                                        <Text fontSize={fontSize}>
                                            Household members may be at risk of more severe disease or outcomes from
                                            COVID-19. These members should wear a medical mask when sharing an indoor or
                                            outdoor space with you. If a medical mask is recommended but not available,
                                            wear a well-constructed and well-fitting non-medical mask.
                                        </Text>
                                        <Text fontSize={fontSize}>Learn more about:</Text>
                                        <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                            <ul>
                                                <NavLink
                                                    passHref
                                                    url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                                    styleProps={linkStyling}
                                                    textDecoration>
                                                    <li>
                                                        <Text _hover={hoverColor} fontSize={fontSize}>
                                                            COVID-19 mask use: Advice for community settings
                                                        </Text>
                                                    </li>
                                                </NavLink>
                                                <NavLink
                                                    passHref
                                                    url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html#people"
                                                    styleProps={linkStyling}
                                                    textDecoration>
                                                    <li>
                                                        <Text _hover={hoverColor} fontSize={fontSize}>
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
                                            <Text fontSize={fontSize}>Children</Text>
                                        </Box>
                                        <AccordionIcon />
                                    </AccordionButton>
                                </h2>
                                <AccordionPanel pb={4}>
                                    <Text fontSize={fontSize}>
                                        Children under the age of 2 years should not wear masks. Children 2 to 5 years
                                        old may be able to wear a mask if they:
                                    </Text>
                                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>are supervised</Text>
                                            </li>
                                            <li>
                                                <Text fontSize={fontSize}>can tolerate it</Text>
                                            </li>
                                            <li>
                                                <Text fontSize={fontSize}>know how to put it on and take it off</Text>
                                            </li>
                                        </ul>
                                    </Box>
                                    <Text fontSize={fontSize}>
                                        Children older than 5 years should wear a mask in the same situations or
                                        settings as adults.
                                    </Text>
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                    </Box>
                </Box>

                {/* Actions to follow */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Actions to follow
                    </Heading>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you&apos;re in quarantine or isolation, you should:
                    </Text>
                    <Box marginLeft={marginLeft}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    follow all advice and directions from your local public health authority
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    maintain the greatest physical distance possible with other household members
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>wear the right type of mask for the situation</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>keep your space properly ventilated</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>wash your hands often with soap and water</Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            use hand sanitizer that&apos;s at least 60% alcohol if soap and water
                                            aren&apos;t available
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize={fontSize}>take precautions with your pets</Text>
                            </li>
                        </ul>
                    </Box>
                    <Box marginLeft={marginLeft}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>exercise at home</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>work from home if you can</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>rest and eat a balanced diet</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>walk your pet on your own property</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>if possible, have essentials delivered to you from a: </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>friend</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>neighbour</Text>
                                    </li>

                                    <li>
                                        <Text fontSize={fontSize}>family member</Text>
                                    </li>
                                </ul>
                            </Box>
                            <li id="actionsavoid">
                                <Text fontSize={fontSize}>go outside on your private balcony, deck or backyard</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    keep in touch with family and friends with technology, such as video calls
                                </Text>
                            </li>
                        </ul>
                    </Box>
                </Box>

                {/* Actions to avoid */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Actions to avoid
                    </Heading>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you&apos;re in quarantine or isolation, do <b>not:</b>
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>visit public areas</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>go to work or school</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>visit friends or family</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>have guests over to your home</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    leave your home or co-living setting unless you need medical care
                                </Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        You should also avoid:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>in-person interactions</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>being in the same room as your household members</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    sharing private outdoor space with your household members
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    contact with people who are at risk of more severe disease or outcomes
                                </Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Avoid activities that require being physically close to other household members, such as:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>shared meals</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>family games</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>watching television</Text>
                            </li>
                        </ul>
                    </Box>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Do <b>not</b> share personal items, such as:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>masks</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>towels</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>utensils</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>bed linen</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>toothbrushes</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>food and drink</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>electronic devices</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you&apos;re staying in a hotel for your quarantine or isolation, avoid shared public spaces,
                        such as:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>gyms</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>pools</Text>
                            </li>
                            <li id="ifdevelop">
                                <Text fontSize={fontSize}>lobbies</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>restaurants</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>courtyards</Text>
                            </li>
                        </ul>
                    </Box>
                </Box>

                {/* If you develop severe symptoms */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        If you develop severe symptoms
                    </Heading>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Call <b>911</b> or your local emergency number if you develop severe symptoms, such as:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>significant difficulty breathing</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>chest pain or pressure</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>new onset of confusion</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>difficulty waking up</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you call an ambulance, tell the dispatcher that you have or may have COVID-19.
                    </Text>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you take a private vehicle to the hospital, call ahead to let them know that that you have or
                        may have COVID-19. If possible, only one healthy person should drive you.
                    </Text>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        While in the vehicle, follow personal preventive practices and:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>
                                    make sure all passengers are wearing a <b>medical mask</b>
                                </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            if unavailable, wear a <b>non-medical</b> mask that&apos;s well constructed
                                            and well fitting
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize={fontSize}>
                                    if you&apos;re breathing well, you should also wear a mask
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    keep all of your car windows fully open if possible and safe to do so
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    sit in the back seat on the opposite side from the driver to put as much physical
                                    distance as possible between you
                                </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            in larger vehicles, sit in the furthest row away from the front
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Do <b>not</b> use public transportation to seek medical care unless you have no choice.
                    </Text>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Learn more about:
                    </Text>
                    <Box marginLeft={marginLeft}>
                        <ul>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks.html#p"
                                styleProps={linkStyling}
                                textDecoration>
                                <li id="group">
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        COVID-19: Prevention for individuals
                                    </Text>
                                </li>
                            </NavLink>
                            <NavLink
                                passHref
                                url="https://www.canada.ca/en/public-health/services/diseases/2019-novel-coronavirus-infection/prevention-risks/about-non-medical-masks-face-coverings.html"
                                styleProps={linkStyling}
                                textDecoration>
                                <li>
                                    <Text _hover={hoverColor} fontSize={fontSize}>
                                        COVID-19 mask use: Advice for community settings
                                    </Text>
                                </li>
                            </NavLink>
                        </ul>
                    </Box>
                </Box>

                {/* Group or co-living settings */}
                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Group or co-living settings
                    </Heading>

                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Avoid quarantine or isolation at home if you can&apos;t separate yourself from others, such as
                        if you:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text>share a small apartment</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>share a home with a cramped layout</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    live in the same household with large families or many people
                                </Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>
                                    live in a co-living setting where there&apos;s close interactions with others and
                                    you share common spaces, such as a:
                                </Text>
                            </li>
                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>shelter</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>group home</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>student residence</Text>
                                    </li>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        It may also be difficult to quarantine or isolate if you:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>have care responsibilities for others</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>live in a multi-generational household</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>are a child or older adult who requires care</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Your local public health authority may advise you to quarantine or isolate somewhere you
                        won&apos;t have to share:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>toilets</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>bathrooms</Text>
                            </li>
                            <li>
                                <Text fontSize={fontSize}>a kitchen or cooking area</Text>
                            </li>
                        </ul>
                    </Box>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        Follow this advice by renting a hotel room or similar space, if you can.
                    </Text>
                    <Text fontSize={fontSize} paddingBottom={paddingList}>
                        If you can&apos;t avoid close interactions with others, and you or your household members
                        can&apos;t relocate, you should use a separate:
                    </Text>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            <li>
                                <Text fontSize={fontSize}>room for sleeping, or if not possible: </Text>
                            </li>
                            <Box marginLeft={marginLeft}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            sleep in a separate bed, positioned head-to-toe with others to keep as far
                                            away from one another as possible
                                        </Text>
                                    </li>
                                </ul>
                            </Box>
                            <li>
                                <Text fontSize={fontSize}>washroom, or if not possible: </Text>
                            </li>
                            <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                <ul>
                                    <li>
                                        <Text fontSize={fontSize}>open the window</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>put the toilet lid down before flushing</Text>
                                    </li>
                                    <li>
                                        <Text fontSize={fontSize}>
                                            clean and disinfect surfaces and objects that have been touched after each
                                            use, like:
                                        </Text>
                                    </li>
                                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                                        <ul>
                                            <li>
                                                <Text fontSize={fontSize}>toilets</Text>
                                            </li>
                                            <li>
                                                <Text fontSize={fontSize}>sink faucets</Text>
                                            </li>
                                            <li>
                                                <Text fontSize={fontSize}>door handles</Text>
                                            </li>
                                        </ul>
                                    </Box>
                                </ul>
                            </Box>
                        </ul>
                    </Box>
                </Box>

                <Box paddingBottom={paddingSection}>
                    <Heading as="h2" size={headingSize} paddingBottom={paddingList}>
                        Related links
                    </Heading>
                    <Box marginLeft={marginLeft} paddingBottom={paddingList}>
                        <ul>
                            {otherLinks.map(({ url, text }) => (
                                <NavLink passHref key={url} styleProps={linkStyling} url={url} textDecoration>
                                    <li>
                                        <Text _hover={hoverColor} fontSize={fontSize}>
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
