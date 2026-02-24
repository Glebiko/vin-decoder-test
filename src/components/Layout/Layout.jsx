import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.wrapper}>
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/">Головна</Link>
        <Link to="/variables">Змінні</Link>
      </nav>
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>
      <p>© 2024 VIN Decoder SPA. Тестове завдання.</p>
    </footer>
  </div>
);

export default Layout;
