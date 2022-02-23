import List from "@frontend/components/admin/list";
import { shallow } from "enzyme";

describe("Test UI List", () => {
    it("Render with title and length ", () => {
        //Given
        const title = "Hello";
        const length = 4;
        //When
        let wrapper = shallow(<List length={length} title={title} />);

        //Then
        expect(wrapper.find("#list-title").text()).toEqual(`${title} (${length})`);
    });
    it("Render with title", () => {
        //Given
        const title = "Hello";
        //When
        let wrapper = shallow(<List title={title} />);

        //Then
        expect(wrapper.find("#list-title").text()).toEqual(`${title}`);
    });
});
