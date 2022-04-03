import { shallow } from "enzyme";
import { Button, Text } from "@chakra-ui/react";
import ConfirmAppointment from "@frontend/components/homepage/confirm-appointment";

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

const mock_appointment = [
    {
        appointmentId:23,
        date: "2022-03-27",
        time: "10:30 to 11:00",
    },
]

describe("Rendering <PatientDetailsToProvideForm/>", () => {
    const wrapper = shallow(<ConfirmAppointment  appointment={mock_appointment}/>);
    it("Renders all the Text components", () => {
        expect(wrapper.find(Text)).toHaveLength(1);
    });
    it("Renders all the Button components", () => {
        expect(wrapper.find(Button)).toHaveLength(2);
    });
});

// TOFIX: unknown test failure. 
// describe("onConfirm", () => {
//     it("Calls fetch", async () => {
//         const component = shallow(<ConfirmAppointment  appointment={mock_appointment}/>);
//         component.find(Button).at(0).simulate("click");
//     });
// });

// describe("onDecline", () => {
//     it("Calls fetch", async () => {
//         const component = shallow(<ConfirmAppointment  appointment={mock_appointment}/>);
//         component.find(Button).at(1).simulate("click");
//     });
// });

