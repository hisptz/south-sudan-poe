import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
    return (<div className={styles.container} >

        <Link to="profile/123"> Home</Link>
    </div>);
}