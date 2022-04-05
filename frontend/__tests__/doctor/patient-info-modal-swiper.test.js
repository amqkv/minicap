import PatientInfoModalSwiper from "@frontend/components/doctor/patient-info-modal-swiper";
import PatientStatus from "@frontend/components/doctor/patient-status";
import CheckMark from "@frontend/components/UI/checkmark";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { shallow } from "enzyme";

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

describe("<PatientInfoModalSwiper/>", () => {
    it("renders swiper with content", () => {
        //GIVEN
        const patient = DEFAULT_PATIENT;
        //WHEN
        const wrapper = shallow(<PatientInfoModalSwiper patient={patient} onMutate={jest.fn()} />);

        //THEN
        expect(wrapper.find(PatientStatus)).toHaveLength(1);
        expect(wrapper.find(CheckMark)).toHaveLength(1);
    });
    it("checks the click simulation", async () => {
        //GIVEN
        const patient = DEFAULT_PATIENT;
        const mutate = jest.fn();
        //WHEN
        const wrapper = shallow(<PatientInfoModalSwiper patient={patient} onMutate={mutate} />);

        //THEN
        await wrapper.find(CheckMark).at(0).dive().find("Box").at(0).simulate("click");
        // expect(wrapper.find(CheckMark).at(0).dive().find("Box"));
        expect(mutate.mock.calls).toHaveLength(1);
    });
});
