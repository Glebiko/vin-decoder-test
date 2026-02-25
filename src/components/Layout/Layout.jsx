import { Link } from 'react-router-dom';
import styles from './Layout.module.css';

const Layout = ({ children }) => (
  <>
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Link to="/">Головна</Link>
          <Link to="/variables">Змінні</Link>
        </nav>
      </div>
    </header>

    <main className={styles.main}>
      <div className={styles.container}>{children}</div>
    </main>

    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>© 2024 VIN Decoder SPA. Тестове завдання.</p>
      </div>
    </footer>
  </>
);

export default Layout;
