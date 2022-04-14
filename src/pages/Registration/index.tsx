import styles from "./Registration.module.css";
import { Card} from "@dhis2/ui";
import Form from "./components/Form";
import Back from "../../shared/components/Back";

const Registration = () => {
  return (
    <div className={styles.container}>
      <Back />
      <div className="content-body">
        <h2>Registration</h2>
        <Card style={{ padding: "10px" }}>
          <Form />
        </Card>
      </div>
    </div>
  );
};

export default Registration;
