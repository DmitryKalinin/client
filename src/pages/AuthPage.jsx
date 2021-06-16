import React, {useContext, useEffect, useState} from 'react'
import {useMessage} from '../hooks/message.hook'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import "../index.css"

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError}= useHttp()
    const [hiddReg, sethiddReg] = useState({hid:'none',inReg:'Вход'})
    const [form, setForm] = useState({
        email:'',
        password:'',
        userName:'',
        surname:'',
        role:'teacher'
    })
    useEffect(() =>{
        message(error)
        clearError()
    },[error,message,clearError])

    useEffect( () =>{
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const registerHandler = async ()=>{
        try{
            const data = await request('./api/auth/register', 'POST', {...form})
            message(data.message)
            console.log('Data', data)
        }catch(e){}
    }
    const loginHandler = async ()=>{
        try{
            const data = await request('./api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.newrole)       
        }catch(e){}
    }
    const hiddRegHandler = async ()=>{ hiddReg.hid ==='none'? 
                                        sethiddReg({hid:'contents',inReg:'Регистрация'}) :
                                        sethiddReg({hid:'none',inReg:'Вход'}) }
                                        
    return (
        <div className="row mt-5 ">
            <div className="col s6 offset-s3">

                <div className="card maincolor">
                    <div className="card-content white-text">
                        <div className="btn-auth">
                            
                            <button className="btn grey lighten-1 black-text" onClick={hiddRegHandler} >Вход\Регистрация</button>
                        </div>
                        <span className="card-title">{hiddReg.inReg}</span>
                        <div>
                            
                            <div className="regist" style={{display: hiddReg.hid}}>
                            <form action="#">
                            <p>
                                <label>
                                    <input name="role" value="teacher" type="radio" onChange={changeHandler} />
                                    <span>Учитель</span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input name="role" value="student" type="radio" onChange={changeHandler} />
                                    <span>Ученик</span>
                                </label>
                            </p>
                        </form>
        
                            <div className="input-field reg" >
                                <input 
                                    placeholder="Введите Имя"
                                    id="userName"
                                    type="text"
                                    name="userName"
                                    className="yellow-input"
                                    value ={form.userName}
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="userName">Имя</label>
                            </div>
                            <div className="input-field reg">
                                <input
                                    placeholder="Введите Фамилию"
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    className="yellow-input"
                                    value ={form.surname}
                                    onChange={changeHandler}
                                    />
                                <label htmlFor="surname">Фамилия</label>
                            </div>
                                
                            </div>
                        
                            <div className="input-field">
                                <input
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    className="yellow-input"
                                    value ={form.email}
                                    onChange={changeHandler}
                                />
                                 <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    className="yellow-input"
                                    value ={form.password}
                                    onChange = {changeHandler}
                                />
                                 <label htmlFor="email">Пароль</label>
                            </div>
                        </div>
                       </div>
                    <div className="card-action">
                        <button
                         className="btn yellow darken-4"
                          onClick={loginHandler}
                          style={{marginRight: 10}}
                          disabled={loading}
                          ><i class="fa fa-sign-in" aria-hidden="true"></i>&nbsp;Войти</button>
                        <button 
                         className="btn grey lighten-1 black-text"
                         onClick={registerHandler}
                         disabled={loading}
                         ><i class="fa fa-id-card-o" aria-hidden="true"></i>&nbsp;Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}