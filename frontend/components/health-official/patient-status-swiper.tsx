import PatientStatus from "./patient-status";
import { Box, Center, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { CSSProperties } from "react";
import { Patient_HealthOfficial } from "@frontend/models/patient";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface AppProps {
    patient: Patient_HealthOfficial;
}
const arrowStyles: CSSProperties = {
    position: "absolute",
    zIndex: 2,
    top: "calc(50% - 15px)",
    width: 30,
    height: 30,
    cursor: "pointer",
    boxShadow: "2px 2px 15px 0.5px #8f8f8f26",
    borderRadius: "5px",
};
const PatientStatusSwiper = ({ patient }: AppProps) => {
    if (patient.status.length == 0) {
        return (
            <Text>
                {" "}
                <Center>No statuses to show. </Center>{" "}
            </Text>
        );
    } else {
        return (
            <div>
                <Box mb="10px" className="header">
                    <Flex>
                        <Heading size="md" flex="3">
                            {" "}
                            Details updated{" "}
                            {patient.status[0].lastUpdated > 1
                                ? patient.status[0].lastUpdated.toFixed(0)
                                : patient.status[0].lastUpdated.toFixed(1)}{" "}
                            hr(s) ago:{" "}
                        </Heading>
                    </Flex>
                </Box>
                <Carousel
                    // Custom arrows because the original one don't look visible with the white background
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button
                                type="button"
                                onClick={onClickHandler}
                                title={label}
                                style={{ ...arrowStyles, left: 15 }}>
                                <ChevronLeftIcon />
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button
                                type="button"
                                onClick={onClickHandler}
                                title={label}
                                style={{ ...arrowStyles, right: 15 }}>
                                <ChevronRightIcon />
                            </button>
                        )
                    }
                    showStatus={false}
                    showIndicators={false}
                    showArrows={true}>
                    {patient?.status?.map((statusInfo, index) => {
                        return (
                            <div key={index}>
                                <Center>
                                    <HStack align="center">
                                        <Box>
                                            <PatientStatus patient={patient} statusIndex={index} />
                                        </Box>
                                    </HStack>
                                </Center>
                            </div>
                        );
                    })}
                </Carousel>
            </div>
        );
    }
};

export default PatientStatusSwiper;
