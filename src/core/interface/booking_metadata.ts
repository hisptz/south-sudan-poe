export interface BookingProgramTranslation {
  property: string;
  locale: string;
  value: string;
}

export interface BookingprogramStageDataElements {
  id: string;
  compulsory: boolean;
}

export interface BookingOptionSetOption {
  code: string;
  name: string;
  translations: BookingProgramTranslation[];
}
export interface BookingOptionSet {
  id: string;
  options: BookingOptionSetOption;
}

export interface BookingDataElements {
  id: string;
  valueType: string;
  displayFormName: string;
  translations: BookingProgramTranslation[];
}

export interface BookingprogramStageSections {
  id: string;
  displayFormName: string;
  translations: BookingProgramTranslation[];
  dataElements: BookingprogramStageDataElements[];
}
export interface BookingProgramStagesMetaData {
  id: string;
  displayFormName: string;
  translations: BookingProgramTranslation[];
  programStageDataElements: BookingprogramStageDataElements[];
  programStageSections: BookingprogramStageSections[];
}
