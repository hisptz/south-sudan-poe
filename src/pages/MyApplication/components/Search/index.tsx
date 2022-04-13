import { Button, IconArrowLeft24 } from '@dhis2/ui';
import styles from './Search.module.css'

function Search() {
    return (
        <div className={styles.container}>
            <input /> <Button name="Primary button" primary value="default">Search</Button>
        </div>
    )
}

export default Search;