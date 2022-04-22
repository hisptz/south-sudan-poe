import { atom, selector, selectorFamily } from "recoil";
import { BookingEvent } from "../interface/events";
import { Booking } from "../models/Booking.model";
import BookingService from "../services/BookingService";

export interface Pagination {
    page: number;
    pageSize: number;
}

const bookingPaginationSelector = atom({
    key: "bookingPaginationState",
    default: selector<Pagination | any>({
        key: "bookingPaginationSelector", // unique ID (with respect to other atoms/selectors)
        get: async ({ get }) => {
            const searchedKeyword = get(currentSearchedPassportNumberState);
            if (!searchedKeyword) return { page: 1, pageSize: 10 };
            const response = await new BookingService().getFilteredBookingPagination(
                searchedKeyword
            );
            if (!response) return { page: 1, pageSize: 10, total: 0 };
            return response.pager;
        },
    }),
});

const currentSearchedPassportNumberState = atom<string>({
    key: "currentSearchedPassportNumberState",
    default: "",
});

const bookingTableList = selector<Booking[]>({
    key: "bookingTableList",
    get: async ({ get }) => {
        const searchedKeyword = get(currentSearchedPassportNumberState);
        const pagination = get(bookingPaginationSelector);

        if (!searchedKeyword) return [];
        if (pagination.total === 0) return [];

        const response = await new BookingService().getBooking(pagination, searchedKeyword);
        if (!response) return [];
        return response.events?.map((event: BookingEvent) => new Booking(event));
    },
});

const expiredBooking = selector<{ expired: Boolean; eventId: string } | undefined>({
    key: "expiredBooking",
    get: async ({ get }) => {
        const bookings = get(bookingTableList);
        if (bookings?.length) {
            const day1 = new Date(bookings ? bookings[0]?.eventDate : 0);
            const day2 = new Date(new Date().toUTCString());

            return {
                expired: day1.getTime() + 24 * 60 * 60 * 1000 - day2.getTime() < 0,
                eventId: bookings[0].id,
            };
        }

        return undefined;
    },
});

const currentBookingProfile = selectorFamily<Booking | any, string | undefined>({
    key: "currentBookingProfile",
    get: (id?: string) => async () => {
        if (id) {
            const booking = await new BookingService().getBookingByEvent(id);
            return new Booking(booking);
        }
        return undefined;
    },
});

const currentBookingProgileId = atom<string>({
    key: "currentProfileBookingId",
    default: "",
});

export {
    bookingPaginationSelector,
    currentSearchedPassportNumberState,
    bookingTableList,
    expiredBooking,
    currentBookingProfile,
    currentBookingProgileId,
};
