import React,{useState, useCallback, useContext, useEffect} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {useHistory} from 'react-router-dom'

export const SettingsInfo = () => {
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request}= useHttp()
    const [form, setForm] = useState({
        userName:'',
        surname:'',
        birth:''
    })

    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async ()=> {
        try{
            const fetched = await request('/api/class', 'GET', null,{Authorization: `Bearer ${token}`})
            await setForm(fetched)
            console.log(form)
        }catch(e){}
    },[token, request])
 

    const saveHandler = async ()=>{
        console.log(form.userName)
        try{
            const data = await request('./api/class/updateteacher', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`})
                history.push(`/${data.link._id}`)
            
            await console.log('Data', ...data)

           return true
        }catch(e){return false}
    }
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    useEffect( () =>{
        fetchLinks()
        
    },[fetchLinks])

    return(
        <div className="">
            <h2>Настройте свой профиль</h2>
            <div className="cardStudet">
                <span>Имя:</span><input  type="text" name="userName" value={form.userName}  onChange={changeHandler} />
                <br></br>
                <span>Фамилия:</span> <input  type="text" name="surname" value={form.surname}  onChange={changeHandler}/>
                <br></br>
                <span>Дата рождения:</span>
                <input type="date" name="birth" onChange={changeHandler}></input>
                <button className="btn blue m-5" onClick={saveHandler}><i class="fa fa-file" aria-hidden="true"></i>&nbsp;Сохранить</button>
            </div>
           
              
        </div>
    )}
