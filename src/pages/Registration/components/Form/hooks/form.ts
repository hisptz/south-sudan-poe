import {usePullBookingMetadata} from "../../../../../core/hooks/booking.hooks";
import {useOrgUnitField} from "./orgUnit";
import {useAlert} from "@dhis2/app-runtime";
import {useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useMemo} from "react";
import BookingService from "../../../../../core/services/BookingService";
import {createBooking, updateBooking} from "../services";
import {cloneDeep, findIndex, get, isEmpty, set} from "lodash";
import {METADATA} from "../../../../../core/constants";
import {sanitizeFields} from "../utils";


export default function useFormControl() {
    const {error, loading, data: formMetaData} = usePullBookingMetadata();
    const {loading: orgUnitsLoading, orgUnitField} = useOrgUnitField();

    const {show, hide} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const navigate = useNavigate()

    const form = useForm({
        shouldFocusError: true
    });
    const param = useParams();

    useEffect(() => {
        new BookingService().getBookingByEvent(param.id as string).then((data) => {
            let obj = {};
            data.dataValues.forEach((x: any) => {
                const key = x.dataElement;
                Object.assign(obj, {[key]: x.value});
            });
            set(obj, 'orgUnit', data.orgUnit);
            form.reset(obj);
        });
    }, [param.id]);
    const onSubmit = useCallback((data) => {

        const sanitizedData = sanitizeFields(data);

        param.id != null
            ? updateBooking(sanitizedData, param.id as string, {show, hide, navigate})
            : createBooking(sanitizedData, {show, hide});
    }, []);

    const sections = useMemo(() => {
        if (formMetaData && !orgUnitsLoading) {
            const metadataSections: any = cloneDeep(formMetaData?.programStages?.[0]?.programStageSections);
            if (metadataSections && !isEmpty(metadataSections)) {
                const tripSectionIndex = findIndex(metadataSections, (x: { id: METADATA; }) => x.id === METADATA.TRIP_INFO_SECTION_ID);
                if (tripSectionIndex > -1) {
                    const dataElements = get(metadataSections, `${tripSectionIndex}.dataElements`);
                    set(metadataSections, `${tripSectionIndex}.dataElements`, [orgUnitField, ...dataElements]);
                }
            }

            return metadataSections;
        }

        return [];
    }, [formMetaData, orgUnitsLoading]);
    const dataElements = get(formMetaData, `programStages.0.programStageDataElements`)


    return {
        loading: loading || orgUnitsLoading,
        form,
        error,
        sections,
        dataElements,
        onSubmit
    }
}
