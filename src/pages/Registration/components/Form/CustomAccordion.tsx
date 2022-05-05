import { AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import { useEffect, useState } from "react";
import FormBuilder from "../FormBuilder";
import { FORM_CONFIG_SECTION } from "./constant";
import { IconChevronDown24 } from "@dhis2/ui";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";

export function CustomAccordion({
  keyValue,
  sectionPosition,
  dataElements,
  sectionDataElementIds,
}: any) {
  const [isExpand, setExpanded] = useState(false);
  let formSectionIdValues = Object.values(FORM_CONFIG_SECTION);
  const { trigger } = useFormContext();
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
      square={true}
      disableGutters={true}
      expanded={
        sectionPosition.id === formSectionIdValues[keyValue]
          ? isExpand
          : param.id
          ? isExpand
          : !isExpand
      }
      onChange={handleChange(sectionPosition.id, sectionDataElementIds)}
    >
      <AccordionSummary
        expandIcon={<IconChevronDown24 />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{sectionPosition.displayFormName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormBuilder
          key={"form-builder" + keyValue}
          title={""}
          controls={sectionPosition.dataElements}
          stageDataElements={dataElements}
        />
      </AccordionDetails>
    </Accordion>
  );
}
