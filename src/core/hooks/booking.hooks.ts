import { useEffect, useState } from "react";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { Booking } from "../models/Booking.model";
import BookingService from "../services/BookingService";
import { BookingConfigurationState } from "../states/Booking_Configuration_state/booking_configuration";
import {
  bookingTableList,
  currentSearchedPassportNumberState,
  Pagination,
} from "../states/Booking_state";

export function useBookingPagination() {
  let currentSearchedPassportNumber = useRecoilValue<string>(
    currentSearchedPassportNumberState
  );
  let bookingTableListState = useRecoilValue<Booking[]>(bookingTableList);
  let _bookingTableList: Booking[] = [];
  const [loading, setLoading] = useState(false);
  let _bookingEventPaginationFilters: Pagination[] = [];

  const onPassportNoSearch = useRecoilCallback(({ set }) => () => {
    new BookingService()
      .getFilteredBookingPagination(currentSearchedPassportNumber)
      .then((pagerEventResponse: any) => {
        if (pagerEventResponse) {
          setLoading(true);
          let pageTotal = pagerEventResponse.pager.total;
          let pageSize: number = 15;
          for (let page = 1; page <= Math.ceil(pageTotal / pageSize); page++) {
            _bookingEventPaginationFilters.push({
              page: page,
              pageSize: pageSize,
            });
          }
          // if (_bookingEventPaginationFilters.length > 0) {
          //     set(bookingPaginationState, _bookingEventPaginationFilters)
          // } else {
          //
          //     set(bookingPaginationState, [{
          //         "page": 1,
          //         "pageSize": 15,
          //     }])
          //
          //
          // }
        }
        // _bookingEventPaginationFilters?.map((pager: Pagination) => {
        //     new BookingService().getBooking(pager, currentSearchedPassportNumber).then((bookingResponse) => {
        //         if (bookingResponse) {
        //             bookingResponse.events?.map((event: any) => {
        //                 _bookingTableList.push(new Booking(event))
        //             })
        //             return set(bookingTableList, _bookingTableList)
        //
        //         }
        //     }).catch((error) => {
        //         setLoading(false)
        //     })
        // })

        setTimeout(() => {
          setLoading(false);
        }, 7000);
      })
      .catch((error) => {
        setLoading(false);
      });
  });

  useEffect(() => {
    onPassportNoSearch();
  }, [currentSearchedPassportNumber]);

  return {
    data: bookingTableListState,
    loading: loading,
  };
}

export function usePullBookingMetadata() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  let [bookingState, setBookingConfigurationState] = useRecoilState<any>(
    BookingConfigurationState
  );
  useEffect(() => {
    setLoading(true);
    new BookingService()
      .getMetadata()
      .then((bookingMetadataResponse) => {
        if (bookingMetadataResponse) {
          setBookingConfigurationState(bookingMetadataResponse);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    error,
    loading,
    data: bookingState,
  };
}
