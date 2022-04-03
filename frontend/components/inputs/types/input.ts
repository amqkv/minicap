export interface InputProps {
    placeholder?: string;
    name: string;
    label?: string;
    options?: string[];
    error?: boolean;
    style?: Object;
    inputProps?: Object;
    onChange?: (...arg: any[]) => void;
}

export interface InputPatientProps {
    label: string;
    units?: string;
    name: string;
    style?: Object;
    error?: boolean;
}
