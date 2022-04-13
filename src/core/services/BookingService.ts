import * as CONSTANTS from "../constants/"
import {HttpService} from "./http_service";

class BookingService{
httpService:any ;
constructor(){
this.httpService = new HttpService();
}

    async  getBookings(){
    return   await  this.httpService.getHttpService('/events?page=1&pageSize=15&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true')
       .then((response:any)=>{
        console.log(response)
       });
    }

      async createBookings(){
     return  await  this.httpService.postHttpService("/events",{})
          .then((response:any)=>{
            console.log(response)
          })
      }

      async updateBookings(){
   return      await  this.httpService.putHttpService("/programs/ArXGGyMgxL4.json?fields=programStages[id,displayFormName,translations,programStageSections[id,displayFormName,translations,dataElements[id,displayFormName,valueType,translations,optionSet[id,options[name,code,translations]]]]]")
             .then((response:any)=>{
                console.log(response)
             })
      }

}

export default BookingService;