import React, {useState, useCallback, useContext, useEffect} from 'react'
import {SettingsTeacher} from '../Components/ForTeacher/Settings/SettingsTeacher'
import {Journal} from '../Components/ForTeacher/Journal'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import example from '../teacher.png';

export const TeacherPage = () => {
    const [visible, setVisible] = useState({settings:false,journal:false})
    const {token} = useContext(AuthContext)
    const {request}= useHttp()
    const [form, setForm] = useState({
        userName:'',
        surname:'',
        number:'',
        postfix:'',
        birth:''
    })
    const fetchLinks = useCallback( async ()=> {
        try{
            const fetched = await request('/api/class', 'GET', null,{Authorization: `Bearer ${token}`})
            await setForm(fetched)
            console.log(form)
        }catch(e){}
    },[token, request])
 
    useEffect( () =>{
        fetchLinks()
        
    },[fetchLinks])
    return(
        <div className="mt-5  ">
            <h4>Cтраница учителя</h4>
            <div className="fa-border" style={{display: 'flex'}}>
                <img className="m-5" src={example} alt="student" />
                <div className="">
                    <h2>{form.userName + ' ' + form.surname+' ' }</h2>
                    <h5>Дата рождения: {form.birth&&form.birth.substring(0,10)}</h5>
                </div>
            </div>
            <button class="btn waves-effect maincolor btn-large m-5" onClick={()=>setVisible({settings:true,journal:false})}><i class="fa fa-cog fa-5x fa-fw"></i>&nbsp;Настройки профиля</button>
            <button class="btn waves-effect maincolor btn-large m-5" onClick={()=>setVisible({settings:false,journal:true})}><i class="fa fa-book fa-fw" aria-hidden="true"></i>&nbsp;Классный журнал</button>
            {visible.settings && <SettingsTeacher/>}
            {visible.journal && <Journal/>}
        </div>
    )
}