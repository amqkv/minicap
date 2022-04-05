import { shallow } from "enzyme";
import CheckMark from "@frontend/components/UI/checkmark";
import { Box, Checkbox } from "@chakra-ui/react";

describe("<CheckMark />", () => {
    it("renders a <CheckMark /> component", () => {
        const wrapper = shallow(<CheckMark isColored={true} />);
        expect(wrapper.find(Checkbox)).toHaveLength(1);
    });
    it("checks the click function #1", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={true} onClicking={click} isUncheckable="true" />);
        wrapper
            .find(Checkbox)
            .at(0)
            .simulate("change", { target: { checked: true } });
        //THEN
        expect(click.mock.calls).toHaveLength(1);
    });
    it("checks the click function #2", () => {
        //Given
        const click = jest.fn();
        //When
        const wrapper = shallow(<CheckMark isColored={false} onClicking={click} isUncheckable="false" />);
        wrapper
            .find(Checkbox)
            .at(0)
            .simulate("change", { target: { checked: true } });
        //THEN
        expect(click.mock.calls).toHaveLength(1);
    });
});
