import {Button, InputField} from '@dhis2/ui';
import styles from './Search.module.css'

function Search() {
    return (
        <div className={styles.container}>
            <InputField/> <Button name="Primary button" primary value="default">Search</Button>
        </div>
    )
}

export default Search;
