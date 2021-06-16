import React, {useState, useCallback, useContext, useEffect} from 'react'
import {SettingsStudent} from '../Components/ForStudent/Settings/SettingsStudent'
import {Journal} from '../Components/ForStudent/Journal'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import example from '../student.png';
export const StudentPage = () => {

    const [visible, setIsSettings] = useState({settings:false,journal:false})
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
        
    },[fetchLinks,visible.settings])
    

    return(
        <div className="mt-5 ">
            <h4>Страница ученика</h4>
            <div className="fa-border" style={{display: 'flex'}}>
                <img className="m-5" src={example} alt="student" />
                <div className="">
                    <h3>{form.userName + ' ' + form.surname+' ' }</h3>
                    <h3>{form.number+form.postfix +' класс'}</h3>
                    <h5>Дата рождения: {form.birth&&form.birth.substr(0,10)}</h5>
                </div>
            </div>
            
            <button class="btn waves-effect maincolor  btn-large m-5" onClick={()=>setIsSettings({settings:true,journal:false})}><i class="fa fa-cog fa-5x fa-fw"></i>&nbsp;Настройки профиля</button>
            <button class="btn waves-effect maincolor  btn-large m-5" onClick={()=>setIsSettings({settings:false,journal:true})}><i class="fa fa-book fa-fw" aria-hidden="true"></i>&nbsp;Журнал оценок</button>
            
            {visible.settings && <SettingsStudent/>}
            {visible.journal && <Journal/>}
        </div>
    )
}