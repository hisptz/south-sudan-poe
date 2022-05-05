import {usePullBookingMetadata} from "../../../../../core/hooks/booking.hooks";
import {useOrgUnitField} from "./orgUnit";
import {useAlert} from "@dhis2/app-runtime";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useMemo, useState} from "react";
import {createBooking, updateBooking} from "../services";
import {cloneDeep, findIndex, get, isEmpty, set} from "lodash";
import {METADATA} from "../../../../../core/constants";
import {getEventFormData, getTemplateFormData, sanitizeFields} from "../utils";
import {PASSPORT_NUMBER_DATA_ELEMENT_ID} from "../constant";
import {useRecoilCallback} from "recoil";
import {currentBookingProfile} from "../../../../../core/states/Booking_state";
import {DataElement, FormSection} from "../../../interfaces/form";

export default function useFormControl() {
    const [dataLoading, setDataLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const {error, loading, data: formMetaData} = usePullBookingMetadata();
    const {loading: orgUnitsLoading, orgUnitField} = useOrgUnitField();
    const param = useParams();
    const {state: locationState} = useLocation();

    const resetProfileData = useRecoilCallback(({refresh}) => (id: string) => {
        refresh(currentBookingProfile(id));
    });

    const {show, hide} = useAlert(
        ({message}) => message,
        ({type}) => ({...type, duration: 3000})
    );
    const navigate = useNavigate();

    const form = useForm({
        shouldFocusError: true,
        shouldUseNativeValidation: true,
        reValidateMode: "onBlur",
    });

    useEffect(() => {
        async function getData() {
            if (param.id) {
                setDataLoading(true);
                form.reset(await getEventFormData(param.id));
                setDataLoading(false);
                return;
            }
            const state: any = locationState;
            if (state?.eventId) {
                setDataLoading(true);
                form.reset(getTemplateFormData(await getEventFormData(state.eventId)));
                setDataLoading(false);
                return;
            }
            if (state?.passportId) {
                form.reset({[PASSPORT_NUMBER_DATA_ELEMENT_ID]: state?.passportId});
            }
        }

        getData();
    }, [param.id, locationState, form]);

    const onSubmit = useCallback(
        (data) => {
            setSaving(true);
            const sanitizedData = sanitizeFields(
                data,
            );
            param.id != null && !(locationState as any)?.expired
                ? updateBooking(sanitizedData, param.id as string, {
                    show,
                    hide,
                    navigate,
                    setSaving,
                    resetProfileData,
                })
                : createBooking(sanitizedData, {show, hide, setSaving, navigate});
        },
        [hide, navigate, param.id]
    );

    const sections: FormSection[] = useMemo(() => {
        if (formMetaData && !orgUnitsLoading) {
            const metadataSections: FormSection[] = cloneDeep(
                formMetaData?.programStages?.[0]?.programStageSections
            );
            if (metadataSections && !isEmpty(metadataSections)) {
                const tripSectionIndex = findIndex(
                    metadataSections,
                    (x: { id: string }) => x.id === METADATA.TRIP_INFO_SECTION_ID
                );
                if (tripSectionIndex > -1) {
                    const dataElements = get(
                        metadataSections,
                        `${tripSectionIndex}.dataElements`
                    );
                    set(metadataSections, `${tripSectionIndex}.dataElements`, [
                        orgUnitField,
                        ...dataElements,
                    ]);
                }
            }
            return metadataSections;
        }
        return [];
    }, [formMetaData, orgUnitsLoading]);
    const dataElements: DataElement[] =
        get(formMetaData, `programStages.0.programStageDataElements`) ?? [];

    return {
        loading: loading || orgUnitsLoading || dataLoading,
        form,
        error,
        sections,
        dataElements,
        onSubmit,
        saving,
    };
}
