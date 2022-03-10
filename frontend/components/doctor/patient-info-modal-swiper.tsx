import PatientStatus from "./patient-status";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Center, HStack } from "@chakra-ui/react";
import CheckMark from "../UI/checkmark";
import { Dispatch, SetStateAction } from "react";
import { Patient } from "@frontend/models/patient";

interface AppProps {
    setCurrentStatus: Dispatch<SetStateAction<number>>;
    patient: Patient;
    reviewHandler: () => Promise<void>;
}

const PatientInfoModalSwiper = ({ patient, setCurrentStatus, reviewHandler }: AppProps) => {
    return (
        <Swiper
            navigation={true}
            modules={[Navigation]}
            onSlideChange={swiper => {
                setCurrentStatus(swiper.activeIndex);
                console.log(swiper.activeIndex);
            }}
            className="mySwiper">
            {patient.status.map((statusInfo, index) => {
                return (
                    <SwiperSlide key={index}>
                        <Center>
                            <HStack align="center">
                                <Box>
                                    <CheckMark
                                        isColored={statusInfo.isReviewed}
                                        color="#1F9D00"
                                        onClicking={reviewHandler}
                                        isUnfillable={"false"}
                                    />
                                </Box>
                                <Box>
                                    <PatientStatus patient={patient} statusIndex={index} />
                                </Box>
                            </HStack>
                        </Center>
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
};

export default PatientInfoModalSwiper;
