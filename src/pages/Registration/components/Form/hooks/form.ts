import {usePullBookingMetadata} from "../../../../../core/hooks/booking.hooks";
import {useOrgUnitField} from "./orgUnit";
import {useAlert} from "@dhis2/app-runtime";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useMemo, useState} from "react";
import BookingService from "../../../../../core/services/BookingService";
import {createBooking, updateBooking} from "../services";
import {cloneDeep, findIndex, get, isEmpty, set} from "lodash";
import {METADATA} from "../../../../../core/constants";
import {sanitizeFields} from "../utils";
import {PASSPORT_NUMBER_DATA_ELEMENT_ID} from "../constant";
import {useRecoilCallback} from "recoil";
import {currentBookingProfile} from "../../../../../core/states/Booking_state";


export default function useFormControl() {
    const [saving, setSaving] = useState(false);
    const {error, loading, data: formMetaData} = usePullBookingMetadata();
    const {loading: orgUnitsLoading, orgUnitField} = useOrgUnitField();
    const param = useParams();
    const {state: locationState} = useLocation();

    const resetProfileData = useRecoilCallback(({refresh}) => (id: string) => {
        refresh(currentBookingProfile(id))
    })


    const {show, hide} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const navigate = useNavigate()

    const form = useForm({
        shouldFocusError: true,
        shouldUseNativeValidation:true,
        reValidateMode:"onBlur",
    });

    useEffect(() => {
        if (param.id) {
            new BookingService().getBookingByEvent(param.id as string).then((data) => {
                let obj = {};
                data.dataValues.forEach((x: any) => {
                    const key = x.dataElement;
                    Object.assign(obj, {[key]: x.value});
                });
                set(obj, 'orgUnit', data.orgUnit);
                form.reset(obj);
            });
        }

        const state: any = locationState;
        if (state?.passportId) {
            form.reset({[PASSPORT_NUMBER_DATA_ELEMENT_ID]: state?.passportId})
        }

    }, [param.id, locationState, form]);


    const onSubmit = useCallback((data) => {
        setSaving(true);
        const sanitizedData = sanitizeFields(data,(locationState as any)?.expired);
        param.id != null&&!(locationState as any)?.expired
            ? updateBooking(sanitizedData, param.id as string, {show, hide, navigate, setSaving, resetProfileData})
            : createBooking(sanitizedData, {show, hide, setSaving, navigate});
    }, [hide, navigate, param.id]);

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

        return [orgUnitField];
    }, [formMetaData, orgUnitsLoading]);
    const dataElements = get(formMetaData, `programStages.0.programStageDataElements`) ?? []

    return {
        loading: loading || orgUnitsLoading,
        form,
        error,
        sections,
        dataElements,
        onSubmit,
        saving
    }
}
