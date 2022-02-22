import { shallow } from "enzyme";
import Legend from "@frontend/components/legend";
import Circle from "@frontend/components/circle";
import { Text } from "@chakra-ui/react";

describe("<Legend />", () => {
    it("renders a <Legend /> component", () => {
        const wrapper = shallow(<Legend />);
        expect(wrapper.find(Circle)).toHaveLength(2);
        expect(wrapper.find(Text)).toHaveLength(2);

        expect(wrapper.find(Text).at(0).text()).toBe("Positive");
        expect(wrapper.find(Text).at(1).text()).toBe("Negative");
    });
});
