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
  
       async getInitialEventsPagination(){
        return   await  this.httpService.getHttpService('/events?page=1&pageSize=15&program=ArXGGyMgxL4&orgUnit=ychsfCBrH6U&order=eventDate%3Adesc&totalPages=true')
        .then((response:any)=>{
         console.log(response['pager'])
        });
       }

       /**
        * let _paginationFilters :any[]= [];
    if(response){
      let pageTotal = response.metaData.pager.total;
      let pageSize:number = 500;
      // let total:number = pageTotal >= pageSize ? pageTotal : pageSize;
      for(let page=1; page <= Math.ceil((pageTotal/pageSize)) ; page++){
     _paginationFilters.push({
   "page": page,
   "pageSize": pageSize,
 })
      }
      return  _paginationFilters;
        * 
        */

      

}

export default BookingService;