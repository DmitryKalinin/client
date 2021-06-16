import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'

export const NewMessage = () =>{

    const [users,setUsers]= useState([])
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [succes,setSucces] =useState(false)
    const [form, setForm] = useState({
        to:'',
        textmessage:'',
    })
    const getUsers = useCallback ( async () => { 
        try{
           const fetched = await request(`./api/message/getuser`, 'GET', null, {Authorization:`Bearer ${token}`})
          console.log(fetched) 
          setUsers(fetched)         
        }catch(e){}
    }, [token,  request])
    
    const sendMessage = async ()=>{
        console.log(form.userName)
        try{
            const data = await request('./api/message/generate', 'POST', {...form}, {
                Authorization: `Bearer ${token}`})
            
            await console.log('Data', ...data)

           setSucces(true)
        }catch(e){return false}
    }

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }



    const succesMessage = ()=>{
        return(
            succes && <div class="card-panel teal lighten-2">Сообщение успешно отправлено</div>
        )
    }
    useEffect( async () =>{
        await getUsers()
       
    }, [getUsers])
    return(
        <div className="mt-5">

            
            <div class="row">
            <p>Кому:</p>
            <select name ="to" onChange={changeHandler}>
                {users && users.map((user) => {
                    return(
                        <option value={user._id}>{user.userName +' '+user.surname }</option>
                    )
                })}
            </select>
                <form class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                       
                    <textarea name ="textmessage" id="textarea1" class="materialize-textarea" onChange={changeHandler}></textarea>
                    <label for="textarea1">Введите сообщение</label>
                    </div>
                   
                </div>
                </form>
                <button className="btn waves-effect maincolor" onClick={sendMessage}><i class="fa fa-share" aria-hidden="true"></i>&nbsp;Отправить</button>
            </div>
            {succesMessage}
        </div>
    )
}