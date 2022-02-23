import useRole from "@frontend/hooks/use-role";
import useSWR from "swr";

jest.mock("swr");
describe("Test role hook", () => {
    it("Loads data", async () => {
        //Given
        useSWR.mockReturnValue({
            data: {
                Patient: "data",
            },
            error: false,
        });
        //When
        const { userRoles, isLoading, isError } = useRole();

        expect(userRoles).toEqual({ Patient: "data" });
        expect(isLoading).toBeFalsy();
        expect(isError).toBeFalsy();
    });

    it("Returns error", async () => {
        //Given
        useSWR.mockReturnValue({
            data: {},
            error: true,
        });
        //When
        const { userRoles, isLoading, isError } = useRole();

        expect(userRoles).toEqual({});
        expect(isLoading).toBeFalsy();
        expect(isError).toBeTruthy();
    });

    it("Return Loading", async () => {
        //Given
        useSWR.mockReturnValue({
            data: null,
            error: false,
        });
        //When
        const { userRoles, isLoading, isError } = useRole();

        expect(userRoles).toEqual(null);
        expect(isLoading).toBeTruthy();
        expect(isError).toBeFalsy();
    });
});
