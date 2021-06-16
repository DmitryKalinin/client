import React,{useState,useContext,useEffect, useCallback} from 'react'
import {NewClass} from './NewClass'
import {ClassList} from './ClassList'
import {SettingsInfo} from './SettingsInfo'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'


export const SettingsTeacher = () => {
    const [isVisibleAdd,setIsVisibleAdd] = useState({a:false,b:false,c:false})
    
    const auth = useContext(AuthContext)
    const {request}= useHttp()
    const [links,setLinks] = useState([])

    const fetchLinks = useCallback( async ()=> {
        try{
            
            const fetched = await request('./api/class/getclass', 'GET', null,{Authorization: `Bearer ${auth.token}`})
           console.log(fetched)
            setLinks(fetched)
        }catch(e){}
    },[auth, request])

    useEffect( () =>{
        fetchLinks()
    },[fetchLinks])
   
    return(
        <div className="">
            <h2>Настройте свой профиль</h2>
            <button class="btn waves-effect maincolor " onClick={() => setIsVisibleAdd({a:true,b:false,c:false}) }><i class="fa fa-user-circle" aria-hidden="true"></i>&nbsp;Личные данные</button>
            <button class="btn waves-effect maincolor m-5" onClick={() => setIsVisibleAdd({a:false,b:true,c:false})}><i class="fa fa-plus" aria-hidden="true"></i>&nbsp;Добавить класс</button>
            <button class="btn waves-effect maincolor " onClick={() => setIsVisibleAdd({a:false,b:false,c:true}) }><i class="fa fa-list-ol" aria-hidden="true"></i>&nbsp;Список классов</button>
            {isVisibleAdd.a && <SettingsInfo/>}
            {isVisibleAdd.b && <ClassList links={links}/>}
            {isVisibleAdd.c && <NewClass/>}
            
        </div>
    )

}