import React from 'react'
import {Link} from 'react-router-dom'


export const ClassList = ({links}) => {

    if(!links.length){
        return <p className="center">Ссылок пока нет</p>
    }

    return (
        <div className="mb-5 fa-border">
            <h4>Список обучающихся классов</h4>
             <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>Класс</th>
                        <th>Предмет</th>
                        <th>Открыть</th>
                    </tr>
                </thead>

                <tbody >
                    {links.map((link, index) =>{
                        return(
                            <tr key={link._id}>
                                <td>{index+1}</td>
                                <td>{link.number +' '  +link.postfix}</td>
                                <td>{link.lesson}</td>
                                <td>
                                    <Link to={`/${link._id}`}>Список учеников</Link>
                                </td>
                            </tr> 
                        )
                    })}
                                    
                </tbody>
            </table>
        </div>
    )
}