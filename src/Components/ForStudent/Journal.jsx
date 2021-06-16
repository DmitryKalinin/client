import React, {useState, useCallback, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../../hooks/http.hook'
import {AuthContext} from '../../context/AuthContext'
import '../../index.css'
import {Link} from 'react-router-dom'


export const Journal = () => {
    const {token,userId} = useContext(AuthContext)
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
           const fetched = await request(`./api/class/getclassstudent`, 'GET', null, {Authorization:`Bearer ${token}`})
          console.log(fetched) 
          setClasses(fetched)
           
        }catch(e){console.log(e)}
    }, [token, request])
    

   // подгружаем оценки
    const getScores = useCallback ( async (a) => { 
        try{
            
            cdateArr=[]
            setDateArr([])
           const fetched = await request(`./api/class/getscoresstudent/`, 'GET', null, {Authorization:`Bearer ${token}`})
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
            <h2>{classes.map(cl=>{
                if(cl._id===currentClass) return ('Журнал '+cl.lesson+' '+cl.number+cl.postfix)
            })}</h2>
            <table class="highlight">
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Предмет</th>
                        { dateArr&& dateArr.map(n =>{
                            console.log(n);
                            return(
                                <th>{("" + (new Date(n)).toISOString()).replace(/^([^T]+)T(.+)$/,'$1')}</th>
                            )
                        })}
                        
                    </tr>
                </thead>
                <tbody >
                    {classes.map((cl, index) =>{
                        return(
                            <tr key={cl._id}>
                                <td>{index+1}</td>
                                <td>{cl.lesson}</td>
                                
                                {dateArr&&dateArr.map(date=>{
                                    return(<td>                                   
                                {scores.map(score=>{
                                        
                                        if(Date.parse(score.date)===date && score.user==userId && score.class===cl._id){
                                            
                                            return(score.score)
                                        }
                                    })}
                                    </td>)
                                })}
                                
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
        
    }, [getScores,getClasses])


    return (
            <div className="">
                               {printTable(dateArr)}
            </div>
           
    )
}