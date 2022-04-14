import { BookingEvent } from "../interface/events";
import { EventDataValueUtil } from "./dataValues.model";

export interface BookingResponse {
  pager: any;
  bookings: Booking[];
}

export interface BookingTableData {
    id:string,
  date: string;
  poe: string;

}

export class Booking {
    constructor(public event:BookingEvent){}


  get id(){
      return this.event.event;;
  }  
  get email(): string {
    return EventDataValueUtil.getDataElementValue("hW9Gm4wqanx",this.event.dataValues);
  }
  get passport(): string {
    return EventDataValueUtil.getDataElementValue("v5KB4meGBFe", this.event.dataValues);
  }

  get gender(): string {
    return EventDataValueUtil.getDataElementValue("K6ciAYeQKWL",this.event.dataValues);
  }

  get nationationality(): string {
    return EventDataValueUtil.getDataElementValue("MQ1WrfzMvbE",this.event.dataValues);
  }

  get flightNumber(): string {
    return EventDataValueUtil.getDataElementValue("eOOFtYiBS79",this.event.dataValues);
  }

  get poe(): string {
    return this.event?.orgUnitName ??"";
  }

  get firstName(): string {
    return EventDataValueUtil.getDataElementValue("YCHZU8pxHLI",this.event.dataValues);
  }
  get middleName(): string {
    return "";
  }

  get lastName(): string {
    return EventDataValueUtil.getDataElementValue("gms6oEPUk7D",this.event.dataValues);
  }

  get sortedEvents(): Array<any> {
  return []
  }

  get age():string{
      return this.calculateAge(
        new Date(
            EventDataValueUtil.getDataElementValue("Pe3CHmZicqT",this.event.dataValues)
        )
      ).toString();
  }

  get dateEnroll():string{
      return this.event.eventDate;
  }


  toTableData(
    position?: number,
    excludeIndexPosition?: boolean
  ): BookingTableData {

    const tableData: BookingTableData = {
      id: this.id,
      poe: this.poe,
      date:this.dateEnroll
    };

    return tableData ;
  }


  static getTableData(
    travellerBooking: Booking[],
  ): BookingTableData[] {
    return (travellerBooking || []).map((booking, index) => {
      return booking.toTableData(index + 1);
    });
  }

  calculateAge(date: Date) {
    const today = new Date();
    var age = today.getFullYear() - date.getFullYear();
    var m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age;
  }

/**
 *  this.eventPayLoad = {
        trackedEntityInstance: trackedEntityInstanceId,
        trackedEntityType: CONSTANT.SHARED_TRACKED_ENTITY_TYPE.person,
        orgUnit: this.selectedOu,
        attributes: _.map(Object.keys(this.attributesData), (att) => {
          return {
            attribute: att,
            value: this.attributesData[att],
          };
        }),
        enrollments: [
          {
            enrollment: enrollmentId,
            trackedEntityInstance: trackedEntityInstanceId,
            trackedEntityType: CONSTANT.SHARED_TRACKED_ENTITY_TYPE.person,
            program: CONSTANT.SHARED_PROGRAM.arrival_traveller_screening,
            orgUnit: this.selectedOu,
            enrollmentDate: enrollmentDate,
            incidentDate: new Date(),
            events: this.getEventsData(),
          },
        ],
      };
 */

}
