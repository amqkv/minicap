import { shallow } from "enzyme";
import Card from "@frontend/components/homepage/card";
import { Image } from "@chakra-ui/react";
import Link from "@frontend/components/navigation/navlink";

describe("<Card />", () => {
    it("renders a <Card /> component", () => {
        const wrapper = shallow(<Card />);

        expect(wrapper.find(Link)).toHaveLength(1);
        expect(wrapper.find(Image)).toHaveLength(1);
    });
});
