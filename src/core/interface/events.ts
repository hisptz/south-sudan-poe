
export interface DataValue {
    lastUpdated?: string;
    storedBy?: string;
    created?: string;
    dataElement: string;
    value: string;
    providedElsewhere?: boolean;
  }

export interface BookingEvent {
    storedBy?: string;
    dueDate?: string;
    createdAtClient?: string;
    program: string;
    event: string;
    programStage: string;
    orgUnit: string;
    enrollment?: string;
    enrollmentStatus?: string;
    status?: string;
    orgUnitName?: string;
    lastUpdatedAtClient?: string;
    eventDate: string;
    attributeCategoryOptions?: string;
    lastUpdated?: string;
    created?: string;
    completedDate?: string;
    deleted?: boolean;
    attributeOptionCombo?: string;
    completedBy?: string;
    dataValues: DataValue[];
    notes?: any[];
    relationships?: any[];
  }