import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import registerLogo from "../../assets/register.png";
import myApplicationLogo from "../../assets/myapplication.png";
import { Card } from "@dhis2/ui";

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>WELCOME TO SOUTH SUDAN</h1>
            <p style={{ textAlign: "center" }}>
                We are glad that you have chosen to travel to South Sudan. For your safety and
                the well-being of those around you, please be informed <br />
                that it is mandatory to complete the Public Health Surveillance Form online
                within 24 hours before arrival. You can start by searching <br />
                your passport on the field above and complete the travellers form.{" "}
            </p>
            <div className={styles["cards-container"]}>
                <div className={styles.card}>
                    <Link to="registration" style={{ textDecoration: "none", fontSize: 18 }}>
                        <Card>
                            <img src={registerLogo} alt="register avatar" />
                        </Card>
                        <div style={{ padding: 10 }}>
                            <label
                                style={{ color: "var(--primary)" }}
                                htmlFor="register label"
                            >
                                Register
                            </label>
                        </div>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link to="my-application" style={{ textDecoration: "none", fontSize: 18 }}>
                        <Card>
                            <img src={myApplicationLogo} alt="my application avatar" />
                        </Card>
                        <div style={{ padding: 10 }}>
                            <label
                                style={{ color: "var(--primary)" }}
                                htmlFor="register label"
                            >
                                My-application
                            </label>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
