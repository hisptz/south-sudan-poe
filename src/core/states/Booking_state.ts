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


const currentSearchedPassportNumberState = atom<string>({
    key:"currentSearchedPassportNumberState",
    default:""
})


const bookingTableList = atom<Booking[]>({
    key:"bookingTableList",
    default:[]
})

const currentBookingProfile = atom<Booking>({
    key:"currentBookingProfile",
})

export {bookingPaginationState,currentSearchedPassportNumberState,bookingTableList,currentBookingProfile}