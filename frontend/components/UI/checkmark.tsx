import { Checkbox, Text } from "@chakra-ui/react";

import { useState } from "react";

interface AppProps {
    isColored: boolean;
    onClicking: () => void;
    isUncheckable: boolean;
}

const CheckMark = ({ isColored, onClicking, isUncheckable }: AppProps) => {
    const [isChecked, setIsChecked] = useState(isColored);

    const clickHandler = () => {
        onClicking();
        setIsChecked(!isChecked);
    };

    return (
        <Checkbox
            size="lg"
            colorScheme="green"
            onChange={clickHandler}
            defaultChecked={isChecked}
            isReadOnly={!isUncheckable && isChecked ? true : false}>
            <Text fontSize="sm">
                <b>Mark as Reviewed</b>
            </Text>
        </Checkbox>
    );
};

export default CheckMark;
