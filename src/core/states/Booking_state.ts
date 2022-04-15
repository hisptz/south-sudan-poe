import {atom, selectorFamily} from "recoil";
import {Booking} from "../models/Booking.model";
import BookingService from "../services/BookingService";

export interface Pagination {
    page: number,
    pageSize: number
}


const bookingPaginationState = atom<Pagination[]>({
    key: 'bookingPaginationState', // unique ID (with respect to other atoms/selectors)
    default: []
})


const currentSearchedPassportNumberState = atom<string>({
    key: "currentSearchedPassportNumberState",
    default: ""
})


const bookingTableList = atom<Booking[]>({
    key: "bookingTableList",
    default: []
})

const currentBookingProfile = selectorFamily<Booking | any, string | undefined>({
    key: "currentBookingProfile",
    get: (id?: string) => async () => {
        if (id) {
            const booking = await new BookingService().getBookingByEvent(id);
            return new Booking(booking);
        }
        return undefined;
    }
})

const currentBookingProgileId = atom<string>({
    key: "currentProfileBookingId",
    default: ""
})

export {
    bookingPaginationState,
    currentSearchedPassportNumberState,
    bookingTableList,
    currentBookingProfile,
    currentBookingProgileId
}
