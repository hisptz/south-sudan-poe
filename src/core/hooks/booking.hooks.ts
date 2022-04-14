import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Booking } from "../models/Booking.model";
import BookingService from "../services/BookingService";
import { BookingConfigurationState } from "../states/Booking_Configuration_state/booking_configuration";
import { bookingPaginationState,bookingTableList,currentBookingProfile,currentSearchedPassportNumberState,Pagination } from "../states/Booking_state";



export function useBookingPagination() {
//create RecoilCallback to bind two statess
    let setPaginatiionState = useSetRecoilState<Pagination[]>(bookingPaginationState);
    let setCurrentSearchedPassportNumberState = useRecoilState<string>(currentSearchedPassportNumberState);
    let currentSearchedPassportNumber = useRecoilValue<string>(currentSearchedPassportNumberState);
    let setBookingTableList = useSetRecoilState<Booking[]>(bookingTableList);
    let _bookingTableList:Booking[] = [];
    const componentWillUnmount = useRef(false)

    useEffect(() => {
        let _bookingEventPaginationFilters:Pagination[] = [];
   new   BookingService().getFilteredBookingPagination(currentSearchedPassportNumber).then(
         (pagerEventResponse:any)=>{
            if(pagerEventResponse){
               let pageTotal = pagerEventResponse.pager.total;
               let pageSize:number = 15;
               for(let page=1; page <= Math.ceil((pageTotal/pageSize)) ; page++){
                   _bookingEventPaginationFilters.push({
            "page": page,
            "pageSize": pageSize,
          }) }
               if(_bookingEventPaginationFilters.length > 0){
                setPaginatiionState(_bookingEventPaginationFilters)
               }else{
               setPaginatiionState([{
                "page": 1,
                "pageSize": 15,
             }])
               }

            }
         }

     )
    }, []);
}
  

  export function usePullBookingMetadata(){
   let setBookingConfigurationState = useSetRecoilState<any>(BookingConfigurationState);
useEffect(()=>{
    new BookingService().getMetadatas().then((bookingMetadataResponse)=>{
         if(bookingMetadataResponse){
            setBookingConfigurationState(bookingMetadataResponse)
         }
    }).catch((error)=>{
         console.log(error)
    })
},[])

  }


  



  