import { shallow } from "enzyme";
import CheckMark from "@frontend/components/UI/checkmark";
import { Box } from "@chakra-ui/react";
// import Check from "@frontend/public/svg/check-mark.svg";

describe("<CheckMark />", () => {
    it("renders a <CheckMark /> component", () => {
        const wrapper = shallow(<CheckMark isColored={true} color="black" />);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("checks the click function", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={true} color="black" onClicking={click} isUnfillable="true" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(1);
    });
    it("checks the click function", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={false} color="black" onClicking={click} isUnfillable="false" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(1);
    });
    it("checks the click function", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={true} color="black" onClicking={click} isUnfillable="false" />);
        wrapper.find(Box).at(0).simulate("click");
        //THEN
        expect(click.mock.calls.length).toBe(0);
    });
});
