import { Action, Dhis2Elements } from "../../core/constants/dhis2Element";
import { Dhis2FormElement } from "../../core/interface/dhis2FormElement.interface";

/**
 * @param data
 * @returns
 * @description Please do not remove this function,used at runtime in this file
 *
 */
//eslint-disable-next-line
function hasValue(data: string) {
  return data !== null && data?.length !== 0 && typeof data != "undefined";
}

/**
 * @param data
 * @returns
 * @description Please do not remove this function,used at runtime in this file
 *
 */
//eslint-disable-next-line
function length(data: any) {
  return data?.toString()?.length ?? 0;
}

export class Dhis2FormValidator {
  static elements: any = {};

  static validate(dataElement: string, value: any) {
    Object.assign(this.elements, { [dataElement]: value });

    const control = this.controlElement(dataElement, Action.showError);

    if (Boolean(control?.eq)) return control?.message;

    return true;
  }

  static hide(dataElement: string, value: any, elements: any[]) {
    !value
      ? Object.assign(this.elements, { [dataElement]: null })
      : Object.assign(this.elements, value);

    const control = this.skipControlElement(dataElement, elements);
    return Boolean(control?.eq);
  }

  static canHideControl(dataElement: string, value: any) {
    Object.assign(this.elements, { [dataElement]: value });

    const canHide = Dhis2Elements.some(
      (x) => x.action === Action.hideField && x.condition?.includes(dataElement)
    );

    const elements = Dhis2Elements.filter(
      (x) => x.action === Action.hideField && x.condition?.includes(dataElement)
    );
    return { canHide, elements };
  }

  static controlElement(dataElement: string, action: Action) {
    return Dhis2Elements.filter(
      (x) => x.action === action && x.dataElement === dataElement
    ).map((x) =>
      Object.assign(
        {},
        {
          //eslint-disable-next-line
          eq: eval(this.translateDhis2Eq(x.condition) as string),
          message: x.message as string,
        }
      )
    )[0];
  }

  static skipControlElement(dataElement: string, elements: Dhis2FormElement[]) {
    return elements
      ?.filter(
        (x) =>
          x.respondedDataElement === dataElement &&
          x.action === Action.hideField
      )
      .map((x) =>
        Object.assign(
          {},
          {
            //eslint-disable-next-line
            eq: eval(this.translateDhis2Eq(x.condition) as string),
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
