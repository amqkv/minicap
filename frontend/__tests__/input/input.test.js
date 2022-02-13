import { shallow } from "enzyme";
import StandardInput from "@frontend/components/inputs/standard-input";
import PasswordInput from '@frontend/components/inputs/password-input';
import DateInput from "@frontend/components/inputs/date-input";
import DropdownInput from '@frontend/components/inputs/dropdown-input';

import { Button, Input, Box, Select } from "@chakra-ui/react";

describe("test the inputs in register <StandardInput/>", () => {
    it("renders the standard input field", async () => {
        const wrapper = shallow(<StandardInput />);
        expect(wrapper.find(Input)).toHaveLength(1);
    });
});

describe("test the inputs in register <PasswordInput/>", () => {
    it("renders the password input field", async () => {
        const wrapper = shallow(<PasswordInput />);
        expect(wrapper.find(Input)).toHaveLength(1);
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});

describe("test the inputs in register <DateInput/>", () => {
    it("renders the date input field", async () => {
        const wrapper = shallow(<DateInput />);
        expect(wrapper.find(Box)).toHaveLength(1);
        // nothing to test lol ? 
        // expect(wrapper.find(Input)).toHaveLength(1);

    });
});

describe("test the inputs in register <DropdownInput/>", () => {
  it("renders the dropdown input field", async () => {
      const wrapper = shallow(<DropdownInput />);
      expect(wrapper.find(Select)).toHaveLength(1);
  });
});
