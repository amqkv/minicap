import { Box } from "@chakra-ui/react";

interface CircleProps {
    color: string;
    diameter: number;
    style?: object;
}

// passing props color and diameter to allow customization
export default function Circle({ color, diameter, style }: CircleProps) {
    const size = diameter + "px";
    return <Box borderRadius="50%" backgroundColor={color} height={size} width={size} {...style} />;
}
