import { Box } from "@chakra-ui/react";
import Check from "../../public/svg/check-mark.svg";
import Cross from "../../public/svg/cross.svg";

import { useState } from "react";

interface AppProps {
    isColored: boolean;

    color: string;
    onClicking: () => void;
    isUncheckable?: string;
}

const CheckMark = ({ isColored, color, onClicking, isUncheckable }: AppProps) => {
    const [isChecked, setIsChecked] = useState(isColored);

    const clickHandler = () => {
        if (isUncheckable === "true") {
            onClicking();
            setIsChecked(!isChecked);
        } else if (isUncheckable === "false" && isChecked === false) {
            onClicking();
            setIsChecked(true);
        } else {
            return;
        }
    };

    return (
        <Box onClick={clickHandler}>
            {isChecked && <Check fill={color} />}
            {!isChecked && <Cross fill={"#E53945"} />}
        </Box>
    );
};

export default CheckMark;
