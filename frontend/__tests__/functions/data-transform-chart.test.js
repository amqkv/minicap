import {
    transformSymptomsData,
    transformWeightTempData,
    formatPatientStatusData,
    extractStatuses,
} from "@frontend/functions/data-transform-chart";
import { DEFAULT_PATIENT } from "@frontend/models/patient";
import { DAY } from "@frontend/utils/constants";
import moment from "moment";

describe("extractStatuses", () => {
    it("Extract the statuses from all patients", () => {
        const patientList = [DEFAULT_PATIENT, DEFAULT_PATIENT];
        expect(extractStatuses(patientList)).toHaveLength(2);
    });
});

describe("transformSymptomsData", () => {
    it("Doesnt count the same symptoms twice", () => {
        const mockStatus = [
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever, sore throat, headache", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(transformSymptomsData(mockStatus, DAY.ALL)).toHaveLength(3);
    });
    it("Only returns the first 7 symptoms", () => {
        const mockStatus = [
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "s1, s2, s3, s4, s5, s6, s7", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "s8, s9, s10", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(transformSymptomsData(mockStatus, DAY.ALL)).toHaveLength(7);
    });
});

describe("transformWeightTempData", () => {
    it("Returns data array", () => {
        const mockStatus = [
            {
                weight: { value: 10, unit: "" },
                temperature: { value: 40, unit: "" },
                symptoms: { value: "", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(transformWeightTempData(mockStatus, DAY.ALL).data).toHaveLength(2);
    });
    it("Does not return data if the day is invalid", () => {
        const mockStatus = [
            {
                weight: { value: 10, unit: "" },
                temperature: { value: 40, unit: "" },
                symptoms: { value: "", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(transformWeightTempData(mockStatus, "").data).toHaveLength(0);
    });
    it("Does not set the lowestWeight value if the weight is higher", () => {
        const mockStatus = [
            {
                weight: { value: 10000000, unit: "" },
                temperature: { value: 40, unit: "" },
                symptoms: { value: "", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(transformWeightTempData(mockStatus, "").data).toHaveLength(0);
    });
});

describe("formatPatientStatusData", () => {
    it("It returns the status history in the correct format", () => {
        const mockStatus = [
            {
                weight: { value: 10, unit: "" },
                temperature: { value: 40, unit: "" },
                symptoms: { value: "", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
            {
                weight: { value: 0, unit: "" },
                temperature: { value: 0, unit: "" },
                symptoms: { value: "fever", unit: "" },
                lastUpdated: 0,
                isReviewed: false,
                statusTime: "",
            },
        ];
        expect(formatPatientStatusData(mockStatus)).toHaveLength(2);
    });
});
