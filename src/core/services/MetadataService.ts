import { HttpService } from "../api/httpService";
import { portsOfEntryOrgUnitGroups } from "../constants/orgUnits";
import { every, flatten } from "lodash";

async function getOrgUnits(orgUnitGroupId: string) {
    const response = await HttpService.get(
        `/organisationUnitGroups/${orgUnitGroupId}.json?fields=id,organisationUnits[id,displayName]`
    );
    if (response?.status === 200) {
        return response?.data?.organisationUnits ?? [];
    }
}

export default class MetadataService {
    static async getPortsOfEntry(): Promise<Array<{ id: string; displayName: string }>> {
        const responses = await Promise.all(
            portsOfEntryOrgUnitGroups.map(
                async (orgUnitGroupId) => await getOrgUnits(orgUnitGroupId)
            )
        );
        return flatten(responses ?? ([] as { id: string; displayName: string }[]));
    }
}
