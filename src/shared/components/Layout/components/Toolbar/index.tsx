import styles from './Toolbar.module.css'
import flag from '../../../../../assets/south-sudan-logo.jpg'
import LanguageSelector from '../../../Dropdown';
import i18n from '@dhis2/d2-i18n'


function Toolbar(args: any) {

    return (
        <div className={styles.toolbar}>
            <img className={styles.logo} src={flag} alt='logo'/>
            <div className={styles.titles}>
                <h1>South Sudan</h1>
                <h3>{i18n.t("Ministry of Health")}</h3>
            </div>
            <div className={styles.dropdown}>
                <LanguageSelector/>
            </div>
        </div>
    )
}

export default Toolbar;
