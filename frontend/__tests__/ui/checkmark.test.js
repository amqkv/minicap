import { shallow } from "enzyme";
import CheckMark from "@frontend/components/UI/checkmark";
import { Box } from "@chakra-ui/react";

describe("<CheckMark />", () => {
    it("renders a <CheckMark /> component", () => {
        const wrapper = shallow(<CheckMark isColored={true} color="black" />);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("checks the click function #1", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={true} color="black" onClicking={click} isUncheckable="true" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(1);
    });
    it("checks the click function #2", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={false} color="black" onClicking={click} isUncheckable="false" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(1);
    });
    it("checks the click function to not be run", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={true} color="black" onClicking={click} isUncheckable="false" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(0);
    });
});
