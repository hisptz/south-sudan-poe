import { Action, Dhis2Elements } from "../../core/constants/dhis2Element";

/**
 *
 * @param data
 * @returns
 * @description Please do not remove this function,used at runtime
 */
function hasValue(data: string) {
    return data != null && data?.length != 0;
}

/**
 *
 * @param data
 * @returns
 * @description Please do not remove this function,used at runtime
 */
function length(data: any) {
    return data?.toString()?.length ?? 0;
}

export class Dhis2FormValidator {
    
    static elements: any = {};

    static validate(dataElement: string, value: any) {
        Object.assign(this.elements, { [dataElement]: value });

        const control = this.controlElement(dataElement);

        if (Boolean(control?.eq)) return control?.message;

        return false;
    }

    static controlElement(dataElement: string) {
        return Dhis2Elements.filter(
            (x) => x.action == Action.showError && x.dataElement == dataElement
        ).map((x) =>
            Object.assign(
                {},
                {
                    eq: eval(this.translateDhis2Eq(x.condition) as string) as boolean,
                    message: x.message as string,
                }
            )
        )[0];
    }

    static translateDhis2Eq(condition?: string) {
        Object.keys(this.elements).forEach((key) => {
            condition = condition?.replaceAll(
                key,
                JSON.stringify(this.elements[key])
            ) as string;
        });

        return condition;
    }
}
