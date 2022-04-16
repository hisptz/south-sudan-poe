import {atom, selector, selectorFamily} from "recoil";
import {BookingEvent} from "../interface/events";
import {Booking} from "../models/Booking.model";
import BookingService from "../services/BookingService";

export interface Pagination {
    page: number,
    pageSize: number
}


const bookingPaginationSelector = atom({
    key: "bookingPaginationState",
    default: selector<Pagination | any>({
        key: 'bookingPaginationSelector', // unique ID (with respect to other atoms/selectors)
        get: async ({get}) => {
            const searchedKeyword = get(currentSearchedPassportNumberState);
            if (!searchedKeyword) return {page: 1, pageSize: 10};
            const response = await new BookingService().getFilteredBookingPagination(searchedKeyword);
            if (!response) return {page: 1, pageSize: 10, total: 0};
            return response.pager;
        },
    })
})


const currentSearchedPassportNumberState = atom<string>({
    key: "currentSearchedPassportNumberState",
    default: ""
})


const bookingTableList = selector<Booking[]>({
    key: "bookingTableList",
    get: async ({get}) => {
        const searchedKeyword = get(currentSearchedPassportNumberState);
        const pagination = get(bookingPaginationSelector);

        if (!searchedKeyword) return [];
        if (pagination.total === 0) return [];

        const response = await new BookingService().getBooking(pagination, searchedKeyword);
        if (!response) return [];
        return response.events?.map((event: BookingEvent) => new Booking(event))

    }
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
    bookingPaginationSelector,
    currentSearchedPassportNumberState,
    bookingTableList,
    currentBookingProfile,
    currentBookingProgileId
}
