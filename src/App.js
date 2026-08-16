import { useSelector } from 'react-redux'
import Header from './components/Header/Header'
import SignUp from './pages/signUp/SignUp'
import { Route, Redirect } from 'react-router-dom'
import Welcome from './pages/Welcome'
import UpdateProfile from './pages/UpdateProfile'
import Verify from './pages/signUp/Verify'
import ForgotPassword from './pages/signUp/ForgotPassword'
import ExpensePage from './pages/ExpensePage/ExpensePage'
import EditExpense from './pages/ExpensePage/EditExpense'
import './App.css'

function App() {
  const isAuth = useSelector((state) => state.auth.isLoggedIn)
  const { isDarkTheme } = useSelector((state) => state.theme)

  document.body.style = isDarkTheme
    ? 'background: rgb(95, 91, 91);'
    : 'background: ;'

  return (
    <div>
      <Header />
      <Route path='/' exact>
        <Redirect to='/login' />
      </Route>
      <Route path='/login'>
        <SignUp />
      </Route>
      <Route path='/welcome'>
        {!isAuth && <Redirect to='/login' />}
        {isAuth && <Welcome />}
      </Route>
      <Route path='/verify'>
        <Verify />
      </Route>
      <Route path='/updateProfile'>
        {!isAuth && <Redirect to='/login' />}
        {isAuth && <UpdateProfile />}
      </Route>
      <Route path='/forgot-password'>
        <ForgotPassword />
      </Route>
      <Route path='/expenses'>
        {!isAuth && <Redirect to='/login' />}
        {isAuth && <ExpensePage />}
      </Route>
      <Route path='/edit-expense'>
        {!isAuth && <Redirect to='/login' />}
        {isAuth && <EditExpense />}
      </Route>
    </div>
  )
}

export default App
