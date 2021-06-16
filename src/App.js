import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import 'materialize-css'
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './Components/Navbar'
import {Loader} from './Components/Loader'

function App() {
  const {token,login,logout,userId, ready,role} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, role);
  if(!ready) {
      return <Loader/>
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated, role
    }}>
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
  }
export default App;