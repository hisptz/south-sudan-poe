import {AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import {useEffect, useState} from "react";
import FormBuilder from "../FormBuilder";
import {IconChevronDown24} from "@dhis2/ui";
import {useFormContext} from "react-hook-form";
import {useParams} from "react-router-dom";
import {DataElement,  FormSection} from "../../interfaces/form";

export function CustomAccordion({
                                    keyValue,
                                    section,
                                    dataElements,
                                    previousSectionDataElementIds,
                                    formSectionIdValues
                                }: {
    keyValue: number,
    section: FormSection,
    dataElements: DataElement[],
    previousSectionDataElementIds: Array<string>,
    formSectionIdValues: Array<string>
}) {
    const [isExpand, setExpanded] = useState(false);
    const {trigger} = useFormContext();
    const param = useParams();

    const handleChange =
        (panelId: any, controlIds: any) => async (event: any, isExpanded: any) => {
            const dataElementIds: any[] = controlIds?.map((dataElements: any) => {
                return dataElements.id;
            });
            if (param.id) {
                setExpanded(isExpanded);
            }
            if (keyValue === 0) {
                setExpanded(isExpanded);
            } else {
                const results = await trigger([...dataElementIds]);
                if (results) {
                    setExpanded(isExpanded);
                    setExpanded(panelId);
                }
            }
        };

    useEffect(() => {
        if (keyValue === 0) {
            setExpanded(!isExpand);
        }
    }, []);

    return (
        <Accordion
            key={keyValue + "-accordion"}
            elevation={0}
            square
            disableGutters
            expanded={
                section.id === formSectionIdValues[keyValue]
                    ? isExpand
                    : param.id
                        ? isExpand
                        : !isExpand
            }
            onChange={handleChange(section.id, previousSectionDataElementIds)}
        >
            <AccordionSummary
                expandIcon={<IconChevronDown24/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{section.displayFormName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormBuilder
                    key={"form-builder" + keyValue}
                    title={""}
                    controls={section.dataElements}
                    stageDataElements={dataElements}
                />
            </AccordionDetails>
        </Accordion>
    );
}
