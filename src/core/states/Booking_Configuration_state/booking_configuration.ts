import {atom} from "recoil";
import BookingService from "../../services/BookingService";


export const BookingConfigurationState = atom({
    key: 'BookingConfigurationState', // unique ID (with respect to other atoms/selectors)
    default: undefined
})

