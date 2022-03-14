import PatientStatus from "./patient-status";

import { Box, Center, HStack } from "@chakra-ui/react";
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
    const reviewHandler = async (statusIdGiven: number) => {
        await fetch("/api/status/review-status", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                statusId: statusIdGiven,
            }),
        });

        onMutate();
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
                {patient.status.map((statusInfo, index) => {
                    return (
                        <div key={index}>
                            <Center>
                                <HStack align="center">
                                    <Box>
                                        <CheckMark
                                            isColored={statusInfo.isReviewed}
                                            color="#1F9D00"
                                            onClicking={() => {
                                                reviewHandler(statusInfo.statusId);
                                            }}
                                            isUnfillable={"false"}
                                        />
                                    </Box>
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
};

export default PatientInfoModalSwiper;