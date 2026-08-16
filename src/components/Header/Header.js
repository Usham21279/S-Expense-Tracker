import React from 'react'
import classes from './Header.module.css'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authSlice'
import { themeActions } from '../../store/themeSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { isLoggedIn } = useSelector((state) => state.auth)
  const { isDarkTheme } = useSelector((state) => state.theme)
  const history = useHistory()

  const logoutHandler = (e) => {
    e.preventDefault()

    dispatch(authActions.logout())
    history.replace('/login')
  }

  return (
    <>
      <button
        onClick={() => dispatch(themeActions.toggleTheme())}
        className={classes.themeD}
      >
        {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
      </button>
      <header className={classes.header}>
        <ul className={classes.navList}>
          <NavLink to='/welcome' activeClassName={classes.active}>
            <li>HOME</li>
          </NavLink>
          <NavLink to='/expenses' activeClassName={classes.active}>
            <li>Expenses</li>
          </NavLink>
          <NavLink to='/updateProfile' activeClassName={classes.active}>
            <li>Profile</li>
          </NavLink>
          {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
        </ul>
      </header>
    </>
  )
}

export default Header
