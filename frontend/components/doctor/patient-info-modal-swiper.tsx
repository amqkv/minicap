import PatientStatus from "./patient-status";

import { Box, Center, VStack, useToast } from "@chakra-ui/react";
import CheckMark from "../UI/checkmark";
import { CSSProperties } from "react";
import { Patient } from "@frontend/models/patient";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
interface AppProps {
    patient: Patient;
    onMutate: () => void;
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
const PatientInfoModalSwiper = ({ patient, onMutate }: AppProps) => {
    const toast = useToast();
    const reviewHandler = async (statusIdGiven: number) => {
        await fetch("/api/status/review-status", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusId: statusIdGiven,
            }),
        })
            .then(() => {
                toast({
                    title: "Success",
                    description: "This status has been set as reviewed",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                });
                onMutate();
            })
            .catch(err => {
                console.log(err);
                toast({
                    title: "Error!",
                    description: "Something went wrong while trying to review the status. Please try again later.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            });
    };

    return (
        <div>
            <Carousel
                // Custom arrows because the original one don't look visible with the white background
                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                    hasPrev && (
                        <button
                            type="button"
                            onClick={onClickHandler}
                            title={label}
                            style={{ ...arrowStyles, left: 1 }}>
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
                            style={{ ...arrowStyles, right: 1 }}>
                            <ChevronRightIcon />
                        </button>
                    )
                }
                showStatus={false}
                showIndicators={false}
                showArrows={true}>
                {patient.status.map((statusInfo, index) => {
                    return (
                        <div key={index}>
                            <Center>
                                <VStack>
                                    <Box>
                                        <PatientStatus patient={patient} statusIndex={index} alignPassed="left" />
                                        <CheckMark
                                            isColored={statusInfo.isReviewed}
                                            onClicking={() => {
                                                reviewHandler(statusInfo.statusId);
                                            }}
                                            isUncheckable={false}
                                        />
                                    </Box>
                                </VStack>
                            </Center>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default PatientInfoModalSwiper;
