import styles from "./Registration.module.css";
import { Card } from "@dhis2/ui";
import Form from "./components/Form";
import Back from "../../shared/components/Back";
import React, { useEffect } from "react";
import BookService from "../../core/services/BookingService";
const Registration = () => {
  useEffect(() => {
    new BookService().getMetadatas().then((data) => {
      console.log(data);
    });
  });

  return (
    <div className={styles.container}>
      <Back />
      <React.Suspense fallback={<div>Loading</div>}>
      <div className="content-body">
        <h2>Registration</h2>
        <Card style={{ padding: "10px" }}>
          <Form />
        </Card>
      </div>
      </React.Suspense>
    </div>
  );
};

export default Registration;
