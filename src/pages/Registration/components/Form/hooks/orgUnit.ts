import {useEffect, useMemo, useState} from "react";
import MetadataService from "../../../../../core/services/MetadataService";
import {isEmpty} from "lodash";


export function useOrgUnitField() {
    const [loading, setLoading] = useState(false);
    const [orgUnits, setOrgUnits] = useState<{ id: string; displayName: string }[]>([]);

    const orgUnitField = useMemo(() => ({
        id: "orgUnit",
        displayFormName: "Port of Entry",
        valueType: "TEXT",
        optionSet: {
            id: "",
            options: orgUnits?.map((orgUnit: any) => ({
                id: orgUnit.id,
                name: orgUnit.displayName,
                code: orgUnit.id
            }))
        },
        compulsory: true,
    }), [orgUnits]);

    useEffect(() => {
        setLoading(true);
        MetadataService.getPortsOfEntry().then(orgUnits => {
            if (orgUnits && !isEmpty(orgUnits)) {
                setOrgUnits(orgUnits);
            }
        }).catch(error => {
        }).finally(() => {
            setLoading(false);
        });


    }, []);


    return {
        loading,
        orgUnitField
    }
}
