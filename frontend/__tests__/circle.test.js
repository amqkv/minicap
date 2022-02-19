import { shallow } from "enzyme";
import Circle from "@frontend/components/circle";
import { Box } from "@chakra-ui/react";

describe("<Circle/>", () => {
    it("renders a <Circle /> component", () => {
        const wrapper = shallow(<Circle color="red" diameter={24} />);
        expect(wrapper.find(Box)).toHaveLength(1);

        expect(wrapper.find(Box).prop("backgroundColor")).toBe("red");
        expect(wrapper.find(Box).prop("height")).toBe("24px");
        expect(wrapper.find(Box).prop("width")).toBe("24px");
    });
});
