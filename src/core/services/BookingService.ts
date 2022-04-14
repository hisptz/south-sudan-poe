import * as CONSTANTS from "../constants/";
import { BookingEvent } from "../interface/events";
import { HttpService } from "./http_service";

class BookingService {
  httpService: any;
  constructor() {
    this.httpService = new HttpService();
  }

  async getBookings() {
    return await this.httpService
      .getHttpService(
        "/events?program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=false"
      )
      .then((response: any) => {
        return response.data;
      });
  }

  async getBookingByPagination(page: number, pageSize: number) {
    return await this.httpService
      .getHttpService(
        `/events?page=${page}&pageSize=${pageSize}&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`
      )
      .then((response: any) => {
        return response.data;
      });
  }
  async createBooking(bookingObject: BookingEvent) {
    // let body:any =  {

    //           "program": "ArXGGyMgxL4",
    //          "programStage": "ePHVvZFGdZo",
    //          "orgUnit": "ychsfCBrH6U",
    //          "status": "ACTIVE",
    //          "orgUnitName": "Juba Int Airport",
    //          "eventDate": "2022-07-19T01:00:00.000",
    //          "attributeCategoryOptions": "xYerKDKCefk",
    //          "attributeOptionCombo": "HllvX50cXC0",
    //          "dataValues": [
    //              {
    //                  "dataElement": "oBhPNGyqn2a",
    //                  "value": "3"
    //              },
    //              {
    //                  "dataElement": "v5KB4meGBFe",
    //                  "value": "R80460916"
    //              },
    //              {
    //                  "dataElement": "wCjASq6bH2C",
    //                  "value": "No"
    //              },
    //              {

    //                  "dataElement": "Pe3CHmZicqT",
    //                  "value": "1992-01-22T22:00:00.000Z"
    //              },
    //              {

    //                  "dataElement": "fAtpkycHG2R",
    //                  "value": "dav57id "
    //              },
    //              {
    //                  "dataElement": "aIJWYDBFVQT",
    //                  "value": "Ng5I7R"
    //              },
    //              {

    //                  "dataElement": "BH5SRLl5PfH",
    //                  "value": "36"
    //              },
    //              {

    //                  "dataElement": "S6Gct1kOGKh",
    //                  "value": "No"
    //              },
    //              {

    //                  "dataElement": "K6ciAYeQKWL",
    //                  "value": "Male"
    //              },
    //              {
    //                  "dataElement": "MQ1WrfzMvbE",
    //                  "value": "SSD"
    //              },
    //              {
    //                  "dataElement": "cZpW431xdsq",
    //                  "value": "KE"
    //              },
    //              {
    //                  "dataElement": "JGnHr6WI3AY",
    //                  "value": "No"
    //              },
    //              {

    //                  "dataElement": "Rcs5V3Xsloq",
    //                  "value": "SS"
    //              },
    //              {

    //                  "dataElement": "weTF1HjA6o1",
    //                  "value": "Unknown"
    //              },
    //              {

    //                  "dataElement": "YCHZU8pxHLI",
    //                  "value": "Alarm5s John"
    //              },
    //              {

    //                  "dataElement": "eOOFtYiBS79",
    //                  "value": "KY121"
    //              },
    //              {
    //                  "dataElement": "gms6oEPUk7D",
    //                  "value": "Tioue7r"
    //              },
    //              {
    //                  "dataElement": "Cs1wQfbUHSV",
    //                  "value": "901727308309"
    //              },
    //              {

    //                  "dataElement": "hW9Gm4wqanx",
    //                  "value": "Jo20724@gmail.com"
    //              }
    //          ],
    //          "notes": []
    //      }

    return await this.httpService
      .postHttpService("/events", bookingObject)
      .then((response: any) => {
        return response.data;
      });
  }

  async getMetadatas() {
    return await this.httpService
      .getHttpService(
        "/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory,dataElement],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]https://southsudanhis.org/covid19southsudan/api/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory,dataElement],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]https://southsudanhis.org/covid19southsudan/api/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory,dataElement],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]https://southsudanhis.org/covid19southsudan/api/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageDataElements[id,compulsory,dataElement],programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]"
      )
      .then((response: any) => {
        return response.data;
      });
  }

  async getBookingByEvent(eventId: String) {
    return await this.httpService
      .getHttpService(
        `/events/${eventId}?page=1&pageSize=15&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true`
      )
      .then((response: any) => {
        return response.data;
      });
  }

  async updateBooking(bookingObject: any, eventId: String) {
    return await this.httpService
      .putHttpService(`/events/${eventId}`, bookingObject)
      .then((response: any) => {
        return response.data;
      });
  }

  async getInitialEventsPagination() {
    return await this.httpService
      .getHttpService(
        "/events?page=0&pageSize=15&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true"
      )
      .then((response: any) => {
        return response.data;
      });
  }
}

export default BookingService;
