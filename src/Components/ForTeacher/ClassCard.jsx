import React from 'react'
import '../../index.css'
import {Link} from 'react-router-dom'
export const ClassCard = ({students}) => {


    return (

        <div className="fa-border">
            <h2>{students[0].number+students[0].postfix+' Класс'}</h2>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>email</th>
                        <th>Карточка ученика</th>
                    </tr>
                </thead>

                <tbody >
                    {students.map((student, index) =>{
                        return(
                            <tr key={student._id}>
                                <td>{index+1}</td>
                                <td>{student.userName}</td>
                                <td>{student.surname}</td>
                                <td>{student.email}</td>
                                <td>
                                    <Link to={`/${student._id}`}>Карточка ученика</Link>
                                </td>
                            </tr> 
                        )
                    })}
                                    
                </tbody>
            </table>


           
        </div>
    )
}