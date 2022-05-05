export interface FormDataElement {
    id: string;
    displayFormName: string;
    valueType: string;
    value: any;
    optionSet?: Array<any>;
}

export interface DataElement {
    id: string;
    compulsory: boolean;
    dataElement: { id: string };
}

export interface FormSection {
    id: string;
    displayFormName: string;
    dataElements: FormDataElement[];
}
