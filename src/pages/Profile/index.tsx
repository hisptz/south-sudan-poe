import { Card } from "@dhis2/ui";
import styles from "./Profile.module.css";
import Back from "../../shared/components/Back";

const  Profile=()=> {
  return (
    <div className={styles.container}>
      <Back />
      <div className="content-body">
        <h2>Traveller profile</h2>
        <Card>
          <div className={styles["flex-row"]} style={{ padding: "16px" }}>
            <div className={styles["flex-item"]}>
              <div className={styles["flex-column"]}>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
              </div>
            </div>
            <div className={styles["flex-item"]}>
              <div className={styles["flex-column"]}>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
                <div className={styles["flex-item"]}>
                  <label className={styles["label-title"]} htmlFor="name">
                    Name:
                  </label>
                  <label className="label-subtitle" htmlFor="value">
                    John Doe Joe
                  </label>
                </div>
              </div>
            </div>
            <div className="flex-item"></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Profile;
