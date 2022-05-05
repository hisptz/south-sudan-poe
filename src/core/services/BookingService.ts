import * as CONSTANTS from "../constants/";
import { BookingEvent } from "../interface/events";
import { Pagination } from "../states/Booking_state";
import { HttpService } from "../api/httpService";
import { METADATA } from "../constants/";

class BookingService {
  constructor() {}

  async getBookingByPagination(page: number, pageSize: number) {
    return await HttpService.get(
      `/events?page=${page}&pageSize=${pageSize}&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`
    ).then((response: any) => response.data);
  }
  async createBooking(bookingObject: BookingEvent) {
    return await HttpService.post("/events", bookingObject).then(
      (response: any) => {
        return response.data;
      }
    );
  }

  async getMetadata() {
    return await HttpService.get(
      `/programs/${METADATA.PROGRAM}.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory,dataElement],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]`
    ).then((response: any) => response.data);
  }

  async getBookingByEvent(eventId: String) {
    return await HttpService.get(
      `/events/${eventId}?page=1&pageSize=2&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`
    ).then((response: any) => response.data);
  }

  async updateBooking(bookingObject: any, eventId: String) {
    return await HttpService.put(`/events/${eventId}`, bookingObject).then(
      (response: any) => response.data
    );
  }

  async getFilteredBookingPagination(passportNumber: string) {
    return passportNumber.length > 1
      ? await HttpService.get(
          `/events?page=1&pageSize=10&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&filter=v5KB4meGBFe:EQ:${passportNumber}&totalPages=true`
        ).then((response: any) => response.data)
      : "";
  }

  async getBooking(pagination: Pagination, passportNumber: string) {
    return await HttpService.get(
      `/events?page=${pagination?.page}&pageSize=${pagination?.pageSize}&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&filter=v5KB4meGBFe:EQ:${passportNumber}&totalPages=true`
    ).then((response: any) => response.data);
  }
}

export default BookingService;
