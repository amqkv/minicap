import { shallow } from "enzyme";
import NextLink from "next/link";

import NavLink from "@frontend/components/navigation/navlink";

describe("<NavLink/>", () => {
  it("renders navlink", () => {
    const wrapper = shallow(<NavLink url="#" />);

    expect(wrapper.find(NextLink)).toHaveLength(1);
    expect(wrapper.find(NextLink).prop("href")).toBe("#");
  });
});
