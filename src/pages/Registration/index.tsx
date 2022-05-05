import React from "react";
import styles from "./Registration.module.css";
import Form from "./components/Form";
import { Card } from "@dhis2/ui";
import Loader from "../../shared/components/Loader";
import i18n from "@dhis2/d2-i18n";

const Registration = () => {
  return (
    <div className={styles.container}>
      <React.Suspense fallback={<Loader />}>
        <div className="content-body">
          <h2>{i18n.t("Registration")}</h2>
          <Card style={{ padding: "10px" }}>
            <Form />
          </Card>
        </div>
      </React.Suspense>
    </div>
  );
};

export default Registration;
