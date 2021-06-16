import React,{useState,useContext} from 'react'
import {useHttp} from '../../../hooks/http.hook'
import {AuthContext} from '../../../context/AuthContext'
import {useHistory} from 'react-router-dom'

const lessons =['Русский язык', 'Алгебра','Геометрия','Литература','Физика','Химия','Астрономия','Обществознание',
'Физическая культура','Рисование','ОБЖ','История']
export const NewClass = () =>{
    const auth = useContext(AuthContext)
    const history = useHistory()
    const {request}= useHttp()
    const [form, setForm] = useState({
        number:'',
        postfix:'',
        lesson:''

    })
  
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const addHandler = async ()=>{
        try{
            const data = await request('./api/class/createclass', 'POST', {...form}, {
                Authorization: `Bearer ${auth.token}`})
                history.push(`/${data.link._id}`)
            
            console.log('Data', data)

           
        }catch(e){}
    }


    return (
        <div className="mt-5 fa-border" >
            <h4>Укажите информацию о классе</h4>
            <span>Класс:</span> <select  name="number"  onChange={changeHandler}>
                        <option value={form.number}>{form.number}</option>
                        {[1,2,3,4,5,6,7,8,9,10,11].map(i=>{
                            
                               return(<option value={i}>{i}</option>)
                            
                        })}
                </select>
                <br></br>
                <span>Буква:</span> <select name="postfix"   onChange={changeHandler}>
                        <option value={form.postfix}>{form.postfix}</option>
                        {['А','Б','В','Г','Д','Е'].map(i=>{
                            
                               return(<option value={i}>{i}</option>)
                            
                        })}
                </select>
                <br></br>
                <span>Предмет:</span> <select name="lesson"   onChange={changeHandler}>
                        <option value={form.lesson}>{form.lesson}</option>
                        {lessons.map(i=>{
                            
                               return(<option value={i}>{i}</option>)
                            
                        })}
                </select>
                <button class="btn waves-effect maincolor m-5" onClick={addHandler}><i class="fa fa-file" aria-hidden="true"></i>&nbsp;Сохранить</button>
        </div>
    )
}