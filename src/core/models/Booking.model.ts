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
  position:number;

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


  get phoneNumner():string{
    return EventDataValueUtil.getDataElementValue("Cs1wQfbUHSV",this.event.dataValues);
  }
  get lastName(): string {
    return EventDataValueUtil.getDataElementValue("gms6oEPUk7D",this.event.dataValues);
  }

  get sortedEvents(): Array<any> {
  return []
  }

  get fullName():string{
      return this.firstName + " " + this.lastName;
  }

  get age():string{
      return this.calculateAge(
        new Date(
            EventDataValueUtil.getDataElementValue("Pe3CHmZicqT",this.event.dataValues)
        )
      ).toString();
  }

  get dateEnroll():string{
    let newDateEnroll = this.event.eventDate
      return newDateEnroll.split("T")[0];
  }


  toTableData(
    position: number,
    excludeIndexPosition?: boolean
  ): BookingTableData {

    const tableData: BookingTableData = {
      id: this.id,
      poe: this.poe,
      date:this.dateEnroll,
      position:position
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


}
