import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'

import {ClassCard} from './ClassCard'


export const DetailPage = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [link,setLink] = useState(null)
    const classId = useParams().id

    const getLink = useCallback ( async () => { 
        try{
          const fetched = await request(`./api/class/getstudents/${classId}`, 'GET', null, {Authorization:`Bearer ${token}`})
          console.log(fetched) 
          setLink(fetched)
           
        }catch(e){}
    }, [token, classId, request])

    useEffect( () =>{
        getLink()
    }, [getLink])

  

    return (
        <div className="">
            {!loading && link && <ClassCard students={link}/> }
        </div>
    )
}