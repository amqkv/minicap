import { Box, List as ChakraList, GridItem } from "@chakra-ui/react";
import classes from "./user-modal.module.css";

interface AppProps {
    title?: string;
    length?: number;
    style?: Record<string, unknown>;
    children: React.ReactNode;
}

const List = ({ title, length, style, children }: AppProps) => {
    const titleText = length ? `${title} (${length})` : title;

    return (
        <GridItem>
            <Box>
                {title && (
                    <h2 id="list-title" className={classes.titleFont}>
                        {titleText}
                    </h2>
                )}
                <ChakraList
                    {...style}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "5px",
                            borderRadius: "8px",
                            backgroundColor: `#D5D4D4`,
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: `#7A7777`,
                        },
                    }}>
                    {children}
                </ChakraList>
            </Box>
        </GridItem>
    );
};

export default List;
