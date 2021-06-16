import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import '../../index.css'
import {Link} from 'react-router-dom'


export const Journal = () => {
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()
    const [scores,setScores] = useState(null)
    const [classes,setClasses] = useState([])
    const [students,setStudents] = useState([])
    const [currentClass,setcurrentClass] = useState('')
    const [currentData,setCurrentData] = useState(null)
    const [dateArr,setDateArr] = useState(null)
    let cdateArr = []
    
    //подгружаем классы
    const getClasses = useCallback ( async () => { 
        try{
           const fetched = await request(`./api/class/getclass`, 'GET', null, {Authorization:`Bearer ${token}`})
          console.log(fetched) 
          setClasses(fetched) 
           
        }catch(e){console.log(e)}
    }, [token, request])
    

   // подгружаем оценки
    const getScores = useCallback ( async (a) => { 
        try{
            console.log(a) 
            cdateArr=[]
            setDateArr([])
           const fetched = await request(`./api/class/getscores/${a}`, 'GET', null, {Authorization:`Bearer ${token}`})
           console.log(fetched) 
          await setScores(fetched)
           fetched.map(score=>{
            
            cdateArr.push(Date.parse(score.date)) 
            setDateArr([...new Set(cdateArr)].sort())
           })
           cdateArr=[...new Set(dateArr)].sort()
      
           
           console.log(dateArr) 
        }catch(e){}
    }, [token, request])

    //подгружаем учеников
    const getStudents = useCallback ( async () => { 
        try{
           const fetched = await request(`./api/class/getstudents/${currentClass}`, 'GET', null, {Authorization:`Bearer ${token}`})
          console.log(fetched) 
          setStudents(fetched)
           
        }catch(e){}
    }, [token, currentClass, request])


   

    const addScore =useCallback( async (score, student,newdata)=>{
        try{
            const data = await request('./api/class/createscore/', 'POST', {data:newdata,
                                                                            user:student,
                                                                            schoolClass:currentClass,
                                                                            score: score}, 
            {   Authorization: `Bearer ${token}`})
                
            console.log('Data', data)

           
        }catch(e){console.log(e)}
    })


    const printTable =(dateArr)=>{


        return(
            <div className="">
            <h3>{classes.map(cl=>{
                if(cl._id===currentClass) return ('Журнал '+cl.lesson+' '+cl.number+cl.postfix)
            })}</h3>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ФИО</th>
                        { dateArr&& dateArr.map(n =>{
                            console.log(n);
                            return(
                                <th>{("" + (new Date(n)).toISOString()).replace(/^([^T]+)T(.+)$/,'$1')}</th>
                            )
                        })}
                        <th>{<input type="date" onChange={e => {
                            setCurrentData(e.target.value)
                        }}></input>}</th>
                    </tr>
                </thead>
                <tbody >
                    {students.map((student, index) =>{
                        return(
                            <tr key={student._id}>
                                <td>{index+1}</td>
                                <td>{student.userName+ ' '+student.surname}</td>
                                
                                {dateArr&&dateArr.map(date=>{
                                    return(<td>
                                   
                                    <select  onChange={e => {
                                    addScore(e.target.value, student._id,date)}}>
                                        <option value={scores.map(score=>{
                                        
                                        if(Date.parse(score.date)===date && score.user==student._id && score.class===currentClass){
                                            
                                            return(score.score)
                                        }
                                    })}>{scores.map(score=>{
                                        
                                        if(Date.parse(score.date)===date && score.user==student._id && score.class===currentClass){
                                            
                                            return(score.score)
                                        }
                                    })}</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </select>
                                    </td>)
                                })}
                                <td><select onChange={e => {
                                    addScore(e.target.value, student._id,currentData)}}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                </select>
                                    </td>
                            </tr> 
                        )
                    })}                                   
                </tbody>
            </table>
            
            </div>
        )
    }
    


    useEffect( async () =>{
        await getClasses()
        await getScores(currentClass)
        await getStudents()
    }, [getScores,getClasses, getStudents])


    return (
            <div className="mb-5">
                <h4>Выберите класс</h4>
                <select  onChange={e => {
                    setcurrentClass(e.target.value)
                    
                        }} > 
                <option  value=''>Выберите класс</option>
                { classes.map((sClass, index) =>{ 
                    return( 
                    <option  value={sClass._id}>{sClass.lesson +' '+ sClass.number + sClass.postfix}</option>                    
                        )
                 })}
                </select>


                {printTable(dateArr)}
            </div>
           
       
    )
}