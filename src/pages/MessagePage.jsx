import React, {useState, useEffect, useContext, useCallback} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {MessagesList} from '../Components/MessagesList'
import {NewMessage} from '../Components/NewMessage'
import {Loader} from '../Components/Loader'

export const MessagePage = () => {
    const [messages,setMessages] = useState([])
    const [visibleNewMessages,setVisibleNewMessages] = useState(false)

    const {loading, request} = useHttp()

    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback( async ()=> {
        try{
            const fetched = await request('/api/message/', 'GET', null,{Authorization: `Bearer ${token}`})
            setMessages(fetched)
        }catch(e){}
    },[token, request])

    useEffect( () =>{
        fetchLinks()
    },[fetchLinks])

    if(loading){
        return <Loader/>
    }


    return (
        <div className="mt-5">
            <button className="btn waves-effect maincolor" onClick={()=>setVisibleNewMessages(!visibleNewMessages)}><i class="fa fa-paper-plane" aria-hidden="true"></i>&nbsp; Новое сообщение</button>
            {visibleNewMessages&&<NewMessage/>}
            {!loading && <MessagesList messages={messages}  /> }
        </div>
    )
}