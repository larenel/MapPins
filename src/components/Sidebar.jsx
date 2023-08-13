import Logo from './Logo'
import styles from './Sidebar.module.css'
import { AppNav } from '../components/AppNav'
import { Outlet } from 'react-router-dom'

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright {new Date().getFullYear()} by WorldWise Inc
        </p>
      </footer>
    </div>
  )
}
