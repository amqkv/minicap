import { shallow } from "enzyme";
import { IconButton } from "@chakra-ui/react";
import Logo from "@frontend/components/navigation/logo";
import Footer from "@frontend/components/navigation/footer";

describe("test the website footer", () => {
  it("renders the footer for the website with 1 logo", async () => {
    const wrapper = shallow(<Footer />);

    expect(wrapper.find(IconButton)).toHaveLength(3);
    expect(wrapper.find(Logo)).toHaveLength(1);
  });
});
