import { Button } from "@dhis2/ui";
import styles from "./Form.module.css";
import { FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import useFormControl from "./hooks/form";
import Loader from "../../../../shared/components/Loader";
import Error from "../../../../shared/components/Error";
import i18n from "@dhis2/d2-i18n";
import { DevTool } from "@hookform/devtools";
import { CustomAccordion } from "./CustomAccordion";
import {FormSection} from "../../interfaces/form";

const Form = () => {
  const { loading, error, sections, dataElements, onSubmit, form, saving } =
    useFormControl();

  if (loading) {
    return (
      <div
        style={{
          minHeight: 500,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Loader small />
      </div>
    );
  }

  if (error) return <Error error={error} />;

  if (!sections) return <div>No form metadata</div>;

  return (
    <FormProvider {...form}>
      <form className={styles.container} onSubmit={form.handleSubmit(onSubmit)}>
        {sections &&
          sections?.map((section: FormSection, key: number) => {
            let previousSectionDataElementIds: any[] =
              key === 0
                ? sections[key]["dataElements"]
                : sections[key - 1]["dataElements"];
            return (
              <CustomAccordion
                keyValue={key}
                section={section}
                dataElements={dataElements}
                previousSectionDataElementIds={previousSectionDataElementIds}
                formSectionIdValues={sections?.map((section: {id: string}) => section.id)}
              />
            );
          })}

        <div className={styles["form-group"]}>
          <Link to="/">
            <Button name="Primary button" value="default">
              {i18n.t("Cancel")}
            </Button>
          </Link>
          <Button
            type="submit"
            primary
            loading={saving}
            name="Primary button"
            value="default"
          >
            {saving ? i18n.t("Saving...") : i18n.t("Save")}
          </Button>
        </div>
      </form>
      <DevTool control={form?.control} />
    </FormProvider>
  );
};

export default Form;
