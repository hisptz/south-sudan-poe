import { DataValue } from "../interface/events";


export class EventDataValueUtil {
    static getDataElement(dataElementId: string, dataValues: DataValue[]):DataValue{
      let filteredDataValues: DataValue[] = dataValues.filter(
        (dataValue) => dataValue.dataElement === dataElementId
      );
      if (filteredDataValues.length > 0) {
        return filteredDataValues[0];
      } else {
        // return ;
        // return 
        return filteredDataValues[0];
      }
    }
    static getDataElementValue(
        dataElementId: string,
        dataValues: DataValue[]
    ) :string{
      let dataValue: DataValue = EventDataValueUtil.getDataElement(
        dataElementId,
        dataValues
      );
  
      if (dataValue) {
        return dataValue.value;
      } else {
        return '';
      }
    }
  }
  