import * as CONSTANTS from '../constants/'
import { BookingEvent } from '../interface/events'
import { Pagination } from '../states/Booking_state'
import { HttpService } from './http_service'

class BookingService {
  httpService: any
  constructor() {
    this.httpService = new HttpService()
  }



  async getBookingByPagination(page: number, pageSize: number) {
    return await this.httpService
      .getHttpService(
        `/events?page=${page}&pageSize=${pageSize}&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`,
      )
      .then((response: any) => {
        return response.data
      })
  }
  async createBooking(bookingObject: BookingEvent) {
    
          return await this.httpService
      .postHttpService('/events', bookingObject)
      .then((response: any) => {
        return response.data
      })
  }

  async getMetadatas() {
    return await this.httpService
      .getHttpService(
        '/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]',
      )
      .then((response: any) => {
        return response.data
      })
  }

  async getBookingByEvent(eventId: String) {
    return await this.httpService
      .getHttpService(
        `/events/${eventId}?page=1&pageSize=2&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`,
      )
      .then((response: any) => {
        return response.data
      })
  }

  async updateBookings(bookingObject: any, eventId: String) {
    return await this.httpService
      .putHttpService(`/events/${eventId}`, bookingObject)
      .then((response: any) => {
        return response.data
      })
  }



  async getFilteredBookingPagination(
    passportNumber: string,
  ) {
    return await this.httpService
      .getHttpService(
        `/events?page=1&pageSize=10&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&filter=v5KB4meGBFe:EQ:${passportNumber}&totalPages=true`,
      )
      .then((response: any) => {
        return response.data
      })
  }

  async getBooking( pagination:Pagination, passportNumber:string) {
    console.log("in pagination ",pagination)
     return await this.httpService
     .getHttpService(
       `/events?page=${pagination?.page}&pageSize=${pagination?.pageSize}&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&filter=v5KB4meGBFe:EQ:${passportNumber}&totalPages=true`,
     )
     .then((response: any) => {
       return response.data
     })
  }
}

export default BookingService
