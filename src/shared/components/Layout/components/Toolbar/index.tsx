import styles from './Toolbar.module.css'
import flag from '../../../../../assets/south-sudan-logo.jpg'
import Dropdown from '../../../Dropdown';

function Toolbar(args: any) {

    return (
        <div className={styles.toolbar}>
            <img className={styles.logo} src={flag} alt='logo'/>
            <div className={styles.titles}>
                <h1>South Sudan</h1>
                <h3>Ministry of Health</h3>
            </div>
            <div className={styles.dropdown}>
                <Dropdown/>
            </div>
        </div>
    )
}

export default Toolbar;
