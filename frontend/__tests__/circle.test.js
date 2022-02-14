import { shallow } from "enzyme";
import Circle from "@frontend/components/circle";
import { Box } from "@chakra-ui/react";

describe("<Circle/>", () => {
    it("renders a <Circle /> component", () => {
        const wrapper = shallow(<Circle />);
        expect(wrapper.find(Box)).toHaveLength(1);
    });
});
