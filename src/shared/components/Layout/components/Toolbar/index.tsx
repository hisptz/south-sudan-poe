import styles from './Toolbar.module.css'
import flag from '../../../../../assets/south-sudan-flag.png'
import SelectDropdown from '../../../SelectDropdown';

function Toolbar(args: any) {

    return (
        <div className={styles.toolbar} >
            <img src={flag} alt='logo' />
            <div className={styles.titles}>
                <h1>South Sudan</h1>
                <h3>Ministry of Health</h3>
            </div>
            <div className={styles.dropdown}>
                <SelectDropdown />
            </div>
        </div>
    )
}

export default Toolbar;