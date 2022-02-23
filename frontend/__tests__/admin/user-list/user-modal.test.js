import { mutate } from "swr";
import { shallow } from "enzyme";
import UserModal from "@frontend/components/admin/user-modal";
import { DEFAULT_USER_SIMPLE } from "@frontend/__tests__/__mock__/mock";

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve("Something"),
    })
);

jest.mock("swr", () => {
    const originalModule = jest.requireActual("swr");
    return {
        __esModule: true,
        ...originalModule,
        mutate: jest.fn(),
    };
});

const onClose = jest.fn();

describe("User modal component test", () => {
    it("renders the user modal", () => {
        //Given
        const dummyUser = DEFAULT_USER_SIMPLE;
        //When
        let wrapper = shallow(<UserModal userInfo={dummyUser} />);
        //Then
        expect(wrapper.find("#user-name").text()).toEqual(`${dummyUser.LastName}, ${dummyUser.FirstName}`);
    });
    it("Checks if onChange changes state", () => {
        //Given
        const dummyUser = DEFAULT_USER_SIMPLE;

        //When
        let wrapper = shallow(<UserModal isOpen={true} userInfo={dummyUser} />);
        //Then

        expect(wrapper.find("RadioGroup").prop("value")).toEqual("Patient");
        wrapper.find("RadioGroup").props().onChange("Doctor");
        expect(wrapper.find("RadioGroup").prop("value")).toEqual("Doctor");
    });

    it("Check apply button for functionality", async () => {
        //Given
        const dummyUser = DEFAULT_USER_SIMPLE;
        //When
        let wrapper = shallow(<UserModal isOpen={true} userInfo={dummyUser} onClose={onClose} />);
        wrapper.find("#apply-button").props().onClick();
        await Promise.resolve();
        //Then

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mutate).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
