import { filter } from "@frontend/functions/sorting-filtering";
import { IMMIGRATION_OFFICER_MOCK_PATIENTS } from "@frontend/__tests__/__mock__/mock";

describe("filter/sorting function", () => {
    it("filters properly with search text", () => {
        expect(
            filter({
                searchText: "bing bong",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                sort: "lastName",
                ascending: true,
                filterValue: "",
                filterKey: "",
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[0]]);
    });

    it("filters properly for hasCovid", () => {
        expect(
            filter({
                searchText: "",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                sort: "",
                ascending: true,
                filterValue: "true",
                filterKey: "hasCovid",
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[1]]);
    });

    it("sorts ascendingly", () => {
        expect(
            filter({
                searchText: "",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                sort: "lastName",
                ascending: true,
                filterValue: "",
                filterKey: "",
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[0], IMMIGRATION_OFFICER_MOCK_PATIENTS[1]]);
    });

    it("sorts descendingly", () => {
        expect(
            filter({
                searchText: "",
                arr: IMMIGRATION_OFFICER_MOCK_PATIENTS,
                sort: "lastName",
                ascending: false,
                filterValue: "",
                filterKey: "",
            })
        ).toStrictEqual([IMMIGRATION_OFFICER_MOCK_PATIENTS[1], IMMIGRATION_OFFICER_MOCK_PATIENTS[0]]);
    });
});
