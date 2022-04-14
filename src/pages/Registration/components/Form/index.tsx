import { Button, CircularLoader } from "@dhis2/ui";
import styles from "./Form.module.css";
import FormBuilder from "../FormBuilder";
import { FormProvider, useForm } from "react-hook-form";
import React, { useCallback, useEffect, useState } from "react";
import { DECLARATIONS } from "./constant";
import { usePullBookingMetadata } from "../../../../core/hooks/booking.hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import BookingService from "../../../../core/services/BookingService";
import { BookingEvent } from "../../../../core/interface/events";
import { useAlert } from "@dhis2/app-runtime";

function showMessge(message: string, type: string, { show, hide }: any) {
  show({
    message: "",
    type: type === "critical" ? { critical: true } : { success: true },
  });
  if (type === "critical") setTimeout(() => hide(), 5000);
}

function createBooking(data: any, { show, hide, navigate }: any): void {
  let dataValues: any[] = [];
  Object.keys(data).forEach((key) => {
    dataValues.push({ dataElement: key, value: data[key] });
  });

  const body: BookingEvent = {
    program: "ArXGGyMgxL4",
    programStage: "ePHVvZFGdZo",
    orgUnit: "ychsfCBrH6U",
    status: "ACTIVE",
    orgUnitName: "Juba Int Airport",
    attributeCategoryOptions: "xYerKDKCefk",
    attributeOptionCombo: "HllvX50cXC0",
    eventDate: new Date().toISOString(),
    event: "",
    dataValues,
  };

  new BookingService()
    .createBooking(body)
    .then((res) => {
      navigate(`/profile/${res}`);
    })
    .catch((error) => {
      showMessge("error", "critical", { show, hide });
    });
}

function updateBooking(data: any, eventId: string, { show, hide,navigate }: any): void {
  let dataValues: any[] = [];
  Object.keys(data).forEach((key) => {
    dataValues.push({ dataElement: key, value: data[key] });
  });

  const body: BookingEvent = {
    program: "ArXGGyMgxL4",
    programStage: "ePHVvZFGdZo",
    orgUnit: "ychsfCBrH6U",
    status: "ACTIVE",
    orgUnitName: "Juba Int Airport",
    attributeCategoryOptions: "xYerKDKCefk",
    attributeOptionCombo: "HllvX50cXC0",
    eventDate: new Date().toISOString(),
    event: "",
    dataValues,
  };

  new BookingService()
    .updateBooking(body, eventId)
    .then((res) => navigate(`/profile/${eventId}`))
    .catch((error) => showMessge("error", "critical", { show, hide }));
}

const Form = () => {
  const { error, loading, data: formMetaData } = usePullBookingMetadata();
  const { show, hide } = useAlert(
    ({ message }) => message,
    ({ type }) => ({ ...type, duration: 3000 })
  );
  const navigate = useNavigate()

  const form = useForm();
  const param = useParams();

  useEffect(() => {
  
    new BookingService().getBookingByEvent(param.id as string).then((data) => {
      let obj = {};
      data.dataValues.forEach((x: any) => {
        const key = x.dataElement;
        Object.assign(obj, { [key]: x.value });
      });
      form.reset(obj);
    });
  }, [param.id]);

  const onSubmit = useCallback((data) => {
    param.id != null
      ? updateBooking(data, param.id as string, { show, hide, navigate })
      : createBooking(data, { show, hide });
  }, []);

  if (loading)
    return (
      <div
        style={{
          height: "500px",
          padding: 16,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div style={{ margin: "auto" }}>
          <CircularLoader />
        </div>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <FormProvider {...form}>
      <div className={styles.container}>
        {formMetaData.programStages &&
          formMetaData.programStages[0].programStageSections?.map(
            (x: any, key: any) => (
              <FormBuilder
                key={"form-bulder" + key}
                title={x.displayFormName}
                controls={x.dataElements}
                stageDataElements={
                  formMetaData.programStages[0]?.programStageDataElements
                }
              />
            )
          )}

        <div className={styles["form-group"]}>
          <Link to="/">
            <Button name="Primary button" value="default">
              Cancel
            </Button>
          </Link>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            name="Primary button"
            value="default"
          >
            Save
          </Button>
        </div>
      </div>
    </FormProvider>
  );
};

export default Form;
