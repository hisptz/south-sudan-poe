import { atom } from "recoil";
import { Booking } from "../models/Booking.model";
export interface Pagination{
    page:number,
    pageSize:number
}


const bookingPaginationState = atom<Pagination[]>({
    key: 'bookingPaginationState', // unique ID (with respect to other atoms/selectors)
   default:[]
})


export {bookingPaginationState}