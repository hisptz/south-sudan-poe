import styles from "./FormBuilder.module.css";
import {CustomInput} from "@hisptz/react-ui";
import {Controller} from "react-hook-form";
import { Dhis2FormValidator} from "../../../../shared/utils/form-validator";
import { useState } from "react";
import { Action, Dhis2Elements } from "../../../../core/constants/dhis2Element";

const FormBuilder = ({
                         title,
                         controls,
                         stageDataElements,
                     }: {
    title: string;
    controls:
        | {
        id: string;
        displayFormName: string;
        valueType: string;
        value: any;
        optionSet?: Array<any>;
    }[]
        | any[];
    stageDataElements: {
        id: string;
        compulsory: boolean;
        dataElement: { id: string };
    }[];
}) => {
    const formIds=["YCHZU8pxHLI","gms6oEPUk7D"];
    const [formValue,setFormValue]=useState<any>();
    const [hiddenElements,setHiddenElements]=useState<any>();
    return (
        <>
            <div className={styles["form-grid"]}>
                <div className={styles["label-container"]}>
                    <label>{title}</label>
                </div>
                <div className={styles["content-container"]}>
                    {controls?.map((control, key) => {
                        const mandatory = control.compulsory ?? stageDataElements.filter(
                            (x) => x.dataElement.id === control.id
                        )[0]?.compulsory;

                        return !Dhis2FormValidator.hide(control.id,formValue,hiddenElements??Dhis2Elements)&&(
                            <Controller
                                key={`${control.id}-form-input`}
                                rules={{
                                    required: mandatory
                                        ? `${control.displayFormName} is required`
                                        : false,
                                    validate: (value: any)=>Dhis2FormValidator.validate(control.id,value)
                                }}
                                name={control.id}
                                render={({field, fieldState}) => (
                                    <div key={key} style={{
                                        width: "100%",
                                        maxWidth: "100%",
                                    }}>
                                        <CustomInput
                                            filterable
                                            optionSet={control.optionSet}
                                            input={{
                                                name: "",
                                                value: field.value,
                                                onChange: (value:any)=>{
      
                                                    if(formIds.includes(control.id)&&/[0-9]{1,}/g.test(value)){
                                                        return ;
                                                    }
                                                    const di=Dhis2FormValidator.canHideControl(control.id,value);
                                                    if(di.canHide){
                                                        setHiddenElements(di.elements)
                                                    }
                                                    
                                                    setFormValue({...{[control.id]:value}});
                                                    field.onChange(value);
                                                }
                                            }}

                                            { /*@ts-ignore */ ...""}
                                            error={Boolean(fieldState.error)}
                                            validationText={fieldState.error?.message}
                                            required={mandatory}
                                            valueType={control.valueType}
                                            label={control.displayFormName}
                                        />
                                    </div>
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default FormBuilder;
