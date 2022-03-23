import { Flex, Box, Button, Input, List } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { MAIN_COLOR } from "@frontend/utils/constants";
import Circle from "@frontend/components/circle";

interface Option {
    text: string;
    key: string;
    type: string;
    icon?: ReactNode;
    value?: string;
}

interface ListPatientsProps {
    options: string[];
    children?: ReactNode;
    placerholderText?: string;
    sort: string;
    changeSort: (key: string) => void;
    ascending: boolean;
    setSearchText: (text: string) => void;
    changeFilter: (key: string, value: string) => void;
    filterValue: string;
    filterKey: string;
    legend?: ReactNode;
}

const buttonProps = {
    variant: "outline",
    size: "lg",
};

const possibleOptions = {
    alphabetical: {
        text: "Alphabetical",
        key: "lastName",
        type: "sort",
    },
    date: {
        text: "Date",
        key: "date",
        type: "sort",
    },
    number: {
        text: "Number of Contacts",
        key: "number",
        type: "sort",
    },
    positive: {
        text: "Positive",
        key: "hasCovid",
        type: "filter",
        icon: <Circle color="red" diameter={24} style={{ marginLeft: "10px" }} />,
        value: "true",
    },
    negative: {
        text: "Negative",
        key: "hasCovid",
        type: "filter",
        icon: <Circle color="green" diameter={24} style={{ marginLeft: "10px" }} />,
        value: "false",
    },
};

export default function ListPatients({
    options,
    children,
    sort,
    changeSort,
    ascending,
    setSearchText,
    filterValue,
    filterKey,
    changeFilter,
    placerholderText,
    legend,
}: ListPatientsProps) {
    const buttons = options.map((filterOption: string) => {
        const { key, text, type, icon, value }: Option = (possibleOptions as any)[filterOption];
        if (type === "sort")
            return (
                <Button key={key} {...buttonProps} onClick={() => changeSort(key)} marginBottom="10px">
                    {text}
                    {sort === key && ascending ? (
                        <ArrowUpIcon marginLeft="10px" />
                    ) : (
                        <ArrowDownIcon marginLeft="10px" />
                    )}
                </Button>
            );
        else if (type === "filter" && value)
            return (
                <Button
                    {...buttonProps}
                    onClick={() => changeFilter(key, value)}
                    background={filterKey === key && filterValue === value ? MAIN_COLOR : "white"}>
                    {text} {icon}
                </Button>
            );
        else return <></>;
    });

    return (
        <Box>
            <Box flex="1">
                <Input
                    placeholder={placerholderText}
                    marginBottom="20px"
                    width="100%"
                    size="lg"
                    isInvalid
                    errorBorderColor="gray.400"
                    onChange={event => setSearchText(event.target.value)}
                />
                <Flex justifyContent="space-around" flexDirection={{ base: "column", md: "row" }} marginBottom="10px">
                    {buttons}
                    {legend}
                </Flex>
            </Box>

            <List>{children}</List>
        </Box>
    );
}
