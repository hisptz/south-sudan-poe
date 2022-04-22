import {get} from "lodash";


export function sanitizeFields(fields: { [key: string]: any },isExpired:boolean) {
    const sanitizedFields = {...fields};
    const orgUnit = get(fields, "orgUnit");
    delete sanitizedFields["orgUnit"];
    
    const dataValues = Object.keys(sanitizedFields).map(key => {
        return {
            dataElement: key,
            value: sanitizedFields[key]
        };
    });

    return {
        orgUnit,
        dataValues
    }
}
