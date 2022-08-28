import { NavLink } from 'react-router-dom'
import css from './Header.module.scss'

const Header = () => {
  return (
    <header className={css.header}>
      <h1 className={css.header__logo}>Great Quotes</h1>

      <nav className={css.header__nav}>
        <ul className={css.list}>
          <li className={css.list__item}>
            <NavLink to="/quotes" end>
              All Quotes
            </NavLink>
          </li>
          <li className={css.list__item}>
            <NavLink to="/quotes/new" end>
              {' '}
              New Quotes
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
