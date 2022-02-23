import { shallow } from "enzyme";
import { mutate } from "swr";
import ApproveUsersRowCard from "@frontend/components/admin/approve-users/approve-users-row-card";
import { DEFAULT_USER_SIMPLE } from "@frontend/__tests__/__mock__/mock";

jest.mock("@frontend/hooks/unconfirmed-users-list");

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

describe("Test Approve User Data hooks", () => {
    it("Checks the confirm user hook call", async () => {
        let userRowCard = shallow(<ApproveUsersRowCard userInfoSimple={DEFAULT_USER_SIMPLE} />);
        userRowCard.dive().find("#confirm-user-button").props().onClick();
        await Promise.resolve();
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(mutate).toHaveBeenCalledTimes(1);
    });
});
