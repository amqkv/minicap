import { shallow } from "enzyme";
import PatientInfoModal from "@frontend/components/modal/modal";
import { Modal } from "@chakra-ui/react";

describe("<Modal/>", () => {
    it("renders a <Modal /> component", () => {
        const wrapper = shallow(
            <PatientInfoModal
                isOpen
                onClose={() => {
                    return;
                }}>
                <p>hello</p>
            </PatientInfoModal>
        );
        expect(wrapper.find(Modal)).toHaveLength(1);
        expect(wrapper.find("p")).toHaveLength(1);
        expect(wrapper.find("p").text()).toBe("hello");
    });
});
