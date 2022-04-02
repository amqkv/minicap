import FilteredPatients from "@frontend/components/patient/filtered-patients";
import { shallow } from "enzyme";
import { Flex, Box, Button, Input, List } from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import Circle from "@frontend/components/circle";

describe("List of filtered patients", () => {
    it("renders a basic list with no children or props", () => {
        const wrapper = shallow(<FilteredPatients></FilteredPatients>);

        expect(wrapper.find(Box)).toHaveLength(2);
        expect(wrapper.find(Flex)).toHaveLength(1);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(List)).toHaveLength(1);
    });

    it("properly changes text", () => {
        const dummyFunction = jest.fn();

        const wrapper = shallow(<FilteredPatients setSearchText={dummyFunction}></FilteredPatients>);
        wrapper.find(Input).simulate("change", { target: { value: "dummy" } });
        expect(dummyFunction).toHaveBeenCalled();
    });

    it("renders children properly", () => {
        const wrapper = shallow(
            <FilteredPatients legend={<ArrowUpIcon />}>
                <ArrowDownIcon />
            </FilteredPatients>
        );

        expect(wrapper.find(ArrowDownIcon)).toHaveLength(1);
        expect(wrapper.find(ArrowUpIcon)).toHaveLength(1);
    });

    it("renders filtering buttons", () => {
        const wrapper = shallow(<FilteredPatients placeholderText="hello"></FilteredPatients>);

        expect(wrapper.find(Input).prop("placeholder")).toBe("hello");
    });

    it("renders sorting buttons", () => {
        const dummyFunction = jest.fn();
        const wrapper = shallow(
            <FilteredPatients
                options={["alphabetical", "number", "date"]}
                changeSort={dummyFunction}></FilteredPatients>
        );

        expect(wrapper.find(Button)).toHaveLength(3);
        expect(wrapper.find(ArrowDownIcon)).toHaveLength(3);
        expect(wrapper.find(Button).at(0).text()).toBe("Alphabetical");
        expect(wrapper.find(Button).at(1).text()).toBe("Number of Contacts");
        expect(wrapper.find(Button).at(2).text()).toBe("Date");

        expect(wrapper.find(Button).at(0).prop("variant")).toBe("outline");
        expect(wrapper.find(Button).at(0).prop("size")).toBe("lg");
        expect(wrapper.find(Button).at(0).prop("marginBottom")).toBe("10px");

        expect(wrapper.find(Button).at(1).prop("variant")).toBe("outline");
        expect(wrapper.find(Button).at(1).prop("size")).toBe("lg");
        expect(wrapper.find(Button).at(1).prop("marginBottom")).toBe("10px");

        expect(wrapper.find(Button).at(2).prop("variant")).toBe("outline");
        expect(wrapper.find(Button).at(2).prop("size")).toBe("lg");
        expect(wrapper.find(Button).at(2).prop("marginBottom")).toBe("10px");

        wrapper.find(Button).at(0).simulate("click");
        expect(dummyFunction).toHaveBeenCalled();
    });

    it("renders filtering buttons", () => {
        const dummyFunction = jest.fn();

        const wrapper = shallow(
            <FilteredPatients options={["positive", "negative"]} changeFilter={dummyFunction}></FilteredPatients>
        );

        expect(wrapper.find(Button)).toHaveLength(2);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Button).at(0).text()).toBe("Positive <Circle />");
        expect(wrapper.find(Button).at(0).prop("background")).toBe("white");

        expect(wrapper.find(Button).at(1).text()).toBe("Negative <Circle />");
        expect(wrapper.find(Button).at(1).prop("background")).toBe("white");
        expect(wrapper.find(Button).at(0).prop("variant")).toBe("outline");
        expect(wrapper.find(Button).at(0).prop("size")).toBe("lg");
        expect(wrapper.find(Button).at(0).prop("marginBottom")).toBe("10px");

        expect(wrapper.find(Button).at(1).prop("variant")).toBe("outline");
        expect(wrapper.find(Button).at(1).prop("size")).toBe("lg");
        expect(wrapper.find(Button).at(1).prop("marginBottom")).toBe("10px");

        wrapper.find(Button).at(0).simulate("click");
        expect(dummyFunction).toHaveBeenCalled();
    });
});
