import React from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'
import {MessagePage} from './pages/MessagePage'
import {StudentPage} from './pages/StudentPage'
import {DetailPage} from './Components/ForTeacher/DetailPage'
import {TeacherPage} from './pages/TeacherPage'
import {AuthPage} from './pages/AuthPage'


export const useRoutes = (isAuthenticated, role) => {



const MainPage =()=> {

    if(role==='student') {return <StudentPage/>}
    else{return <TeacherPage/>}
    
}

    if(isAuthenticated){
        return (
            <Switch>
                <Route path="/message" exact>
                    <MessagePage />
                </Route>
                <Route path="/create" exact>
                    {MainPage}
                </Route>
                <Route path="/:id" >
                    <DetailPage />
                </Route>
               
                <Redirect to="/create" />
                
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/">
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
} 