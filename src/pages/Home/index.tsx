import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import registerLogo from "../../assets/register.png";
import myApplicationLogo from "../../assets/myapplication.png";
import {Card} from "@dhis2/ui";
import i18n from '@dhis2/d2-i18n'

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>{i18n.t("WELCOME TO SOUTH SUDAN")}</h1>
            <p style={{textAlign: "center", width: "50%"}}>
                {
                    i18n.t("We are glad that you have chosen to travel to South Sudan. For your safety and the well-being of those around you, please be informed that it is mandatory to complete the Public Health Surveillance Form online within 24 hours before arrival. You can start by searching your passport on the field above and complete the travellers form.")
                }
            </p>
            <div className={styles["cards-container"]}>
                <div className={styles.card}>
                    <Link to="registration" style={{textDecoration: "none", fontSize: 18}}>
                        <Card>
                            <img src={registerLogo} alt="register avatar"/>
                        </Card>
                        <div style={{padding: 10}}>
                            <label
                                style={{color: "var(--primary)"}}
                                htmlFor="register label"
                            >
                                {
                                    i18n.t("Register")
                                }
                            </label>
                        </div>
                    </Link>
                </div>
                <div className={styles.card}>
                    <Link to="my-application" style={{textDecoration: "none", fontSize: 18}}>
                        <Card>
                            <img src={myApplicationLogo} alt="my application avatar"/>
                        </Card>
                        <div style={{padding: 10}}>
                            <label
                                style={{color: "var(--primary)"}}
                                htmlFor="register label"
                            >
                                {
                                    i18n.t("My Application")
                                }
                            </label>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
