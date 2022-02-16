import { Text } from "@chakra-ui/react";
import { InputProps } from "@frontend/components/inputs/types/input";

export default function StandardInput({ name, label }: InputProps) {
    const today = new Date().toISOString().slice(0, 10);

    return (
        <>
            <Text margin="10px 0">{label}</Text>
            <input className="chakra-input css-1cxpn8z" type="date" name={name} max={today} />
        </>
    );
}
