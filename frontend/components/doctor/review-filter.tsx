import { Select } from "@chakra-ui/react";
import classes from "./review-filter.module.css";

export default function ReviewFilter() {
    return (
        <Select placeholder="Filter By" maxWidth="150px" className={classes.dropdown}>
            <option value="true">Reviewed</option>
            <option value="false">Non Reviewed</option>
        </Select>
    );
}
