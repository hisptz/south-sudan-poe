import styles from "./Toolbar.module.css";
import logo from "../../../../../assets/south-sudan-logo.png";
import flag from "../../../../../assets/south-sudan-flag.png";
import i18n from "@dhis2/d2-i18n";

function Toolbar(args: any) {
    return (
        <div className={styles.toolbar}>
            <img alt="south-sudan-flag" className={styles.flag} src={flag}/>
            <div className={styles.titles}>
                <h1>{i18n.t("South Sudan")}</h1>
                <h3>{i18n.t("Ministry of Health")}</h3>
            </div>
            <div className={styles["flag-area"]}>
                <img className={styles.logo} src={logo} alt="south-sudan-ministry-of-health-logo"/>
            </div>
        </div>
    );
}

export default Toolbar;
