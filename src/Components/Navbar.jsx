import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from '../context/AuthContext'

export const Navbar =() => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const logoutHandler = event =>{
        event.preventDefault()
        auth.logout();
        history.push('/')
    }

    return(
        <nav>
            <div className="nav-wrapper maincolor" style={{padding: '0 2rem'}}>
                 <span className="brand-logo">Журнал учебного заведения</span>
                 <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create"><i class="fa fa-home" aria-hidden="true"></i>&nbsp;Главная</NavLink></li>
                    <li><NavLink to="/message"><i class="fa fa-envelope" aria-hidden="true"></i>&nbsp;Сообщения</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}><i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Выйти</a></li>

                  </ul>
            </div>
        </nav>
    )
}