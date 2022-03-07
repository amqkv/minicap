import { Box } from "@chakra-ui/react";
import Check from "@frontend/public/svg/check-mark.svg";
import { useState } from "react";

interface AppProps {
    isColored: boolean;

    color: string;
    onClicking?: () => void;
    isUnfillable?: string;
}

const CheckMark = ({ isColored, color, onClicking = () => void 0, isUnfillable }: AppProps) => {
    const [isFilled, setIsFilled] = useState(isColored);

    const clickHandler = () => {
        if (isUnfillable === "true") {
            console.log("hi");
            onClicking();
            setIsFilled(!isFilled);
        } else if (isUnfillable === "false" && isFilled === false) {
            console.log("hello");
            onClicking();
            setIsFilled(true);
        } else {
            console.log("goodbye");
            return;
        }
    };

    return (
        <Box onClick={clickHandler}>
            <p> hello</p>
            <Check fill={isFilled ? color : "black"} />
        </Box>
    );
};

export default CheckMark;
