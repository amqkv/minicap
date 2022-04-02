import { shallow } from "enzyme";
import PatientDetailsToProvideForm from "@frontend/components/forms/patient-details-to-provide-form";
import { REQUIRED_DETAILS } from "@frontend/__tests__/__mock__/mock";
import { Box, Flex, Button, Stack, CheckboxGroup, Checkbox } from "@chakra-ui/react";

jest.mock("@chakra-ui/react", () => {
    // --> Original module
    const originalModule = jest.requireActual("@chakra-ui/react");

    const fakeToast = { toast: jest.fn() };

    return {
        __esModule: true,
        ...originalModule,
        useToast: jest.fn().mockImplementation(() => {
            return fakeToast;
        }),
    };
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const mockToast = require("@chakra-ui/react").useToast;

const unmockedFetch = global.fetch;

beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        });
});

afterAll(() => {
    global.fetch = unmockedFetch;
});

describe("Rendering <PatientDetailsToProvideForm/>", () => {
    const wrapper = shallow(<PatientDetailsToProvideForm requiredDetails={REQUIRED_DETAILS} />);
    it("Renders all the Box components", () => {
        expect(wrapper.find(Box)).toHaveLength(1);
    });
    it("Renders all the Stack components", () => {
        expect(wrapper.find(Stack)).toHaveLength(1);
    });
    it("Renders all the CheckboxGroup components", () => {
        expect(wrapper.find(CheckboxGroup)).toHaveLength(1);
    });
    it("Renders all the Checkbox components", () => {
        expect(wrapper.find(Checkbox)).toHaveLength(3);
    });
    it("Renders all the Flex components", () => {
        expect(wrapper.find(Flex)).toHaveLength(1);
    });
    it("Renders all the Button components", () => {
        expect(wrapper.find(Button)).toHaveLength(1);
    });
});
describe("onSave", () => {
    it("Calls fetch", async () => {
        const component = shallow(<PatientDetailsToProvideForm requiredDetails={REQUIRED_DETAILS} />);

        component.find(Checkbox).at(2).simulate("click");
        await component.find(Button).at(0).simulate("click");
        expect(mockToast).toBeCalled();
    });
    it("Calls setCheckedItems", async () => {
        const component = shallow(<PatientDetailsToProvideForm requiredDetails={REQUIRED_DETAILS} />);
        component
            .find(Checkbox)
            .at(2)
            .simulate("change", { target: { checked: false, key: "symptoms" } });
        expect(component.find(Checkbox).get(2).props.checked).toBeFalsy();
    });
});
