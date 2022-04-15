import {Button, Card, IconEdit24} from "@dhis2/ui";
import styles from "./Profile.module.css";
import Back from "../../shared/components/Back";
import {Link} from "react-router-dom";
import QRCODE from "../../assets/QR-Code.png";

const Profile = () => {
    return (
        <div className={styles.container}>
            <div style={{paddingLeft: 16, paddingTop: 16}}>
                <Back/>
            </div>
            <div className="content-body">
                <h2>
                    Traveller profile{" "}
                    <Link to="/registration/123">
                        <IconEdit24/>
                    </Link>{" "}
                </h2>
                <Card>
                    <div
                        className={styles["flex-row"]}
                        style={{padding: "20px", minHeight: 400}}
                    >
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
                                        Passport:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        XSRGFSFUISJ
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Phone number:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        +25578368389
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Email:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        user@gmail.com
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Gender:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        Male
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles["flex-item"]}>
                            <div className={styles["flex-column"]}>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Point of Entry:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        Juma inernational airport
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Arrival date:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        28/03/2022
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Flight number:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        T831237
                                    </label>
                                </div>
                                <div className={styles["flex-item"]}>
                                    <label className={styles["label-title"]} htmlFor="name">
                                        Nationality:
                                    </label>
                                    <label className="label-subtitle" htmlFor="value">
                                        Tanzania
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className={styles["QR-code-container"]}>
                            <div className={styles["QR-code"]}>
                                <img src={QRCODE} alt=""/>
                            </div>
                            <Button>Print</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
