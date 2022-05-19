import {AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import FormBuilder from "../FormBuilder";
import {IconChevronDown24, IconErrorFilled24, colors, Button} from "@dhis2/ui";
import {useFormContext} from "react-hook-form";
import {DataElement, FormDataElement, FormSection} from "../../interfaces/form";
import {useMemo} from "react";
import {intersection} from "lodash";
import {translateDisplayName} from "./utils";
import {LocaleState} from "../../../../core/states/language";
import {useRecoilValue} from "recoil";
import classes from "./Form.module.css"
import i18n from '@dhis2/d2-i18n'

export function CustomAccordion({
                                    keyValue,
                                    onExpand,
                                    expandedAccordions,
                                    section,
                                    dataElements,
                                    previousSectionDataElementIds,
                                    previousSectionId,
                                    nextSectionId
                                }: {
    keyValue: number,
    onExpand: (sectionId: string) => void,
    expandedAccordions: string[],
    section: FormSection,
    nextSectionId?: string,
    previousSectionId?: string,
    dataElements: DataElement[],
    previousSectionDataElementIds: Array<string>,
}) {
    const selectedLocale = useRecoilValue(LocaleState);
    const {trigger, formState} = useFormContext();

    const handleChange =
        (panelId: any, controlIds: any, previous?: boolean) => async (event: any, isExpanded: any) => {
            console.log({panelId, controlIds, isExpanded});
            const dataElementIds: any[] = controlIds?.map((dataElements: any) => {
                return dataElements.id;
            });

            if (previous) {
                onExpand(panelId);
            } else {
                const results = await trigger([...dataElementIds]);
                if (results) {
                    onExpand(panelId);
                }
            }

        };

    const sectionHasErrors = useMemo(() => {
        const errors = formState.errors;

        if (errors) {
            return intersection(section.dataElements.map((dataElement: FormDataElement) => dataElement.id), Object.keys(errors)).length > 0;
        }
    }, [formState]);

    return (
        <Accordion
            key={keyValue + "-accordion"}
            elevation={0}
            square
            disableGutters
            expanded={
                expandedAccordions.includes(section.id)
            }
            onChange={handleChange(section.id, previousSectionDataElementIds)}
        >
            <AccordionSummary
                expandIcon={<IconChevronDown24/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}} className="w-100">
                    <Typography
                        style={{
                            color: sectionHasErrors && colors.red500,
                            fontWeight: "bold"
                        }}>{translateDisplayName(selectedLocale, section.displayFormName, section)}</Typography>
                    {
                        sectionHasErrors && <IconErrorFilled24 color={colors.red500}/>
                    }
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <FormBuilder
                    key={"form-builder" + keyValue}
                    title={""}
                    controls={section.dataElements}
                    stageDataElements={dataElements}
                />
                <div className={classes["accordion-footer"]}>
                    {
                        previousSectionId !== undefined && <Button
                            onClick={handleChange(previousSectionId, section.dataElements, true)}
                        >
                            {i18n.t("Previous")}
                        </Button>
                    }
                    {
                        nextSectionId !== undefined && <Button
                            onClick={handleChange(nextSectionId, section.dataElements)}>
                            {i18n.t("Next")}
                        </Button>
                    }
                </div>
            </AccordionDetails>
        </Accordion>
    );
}
