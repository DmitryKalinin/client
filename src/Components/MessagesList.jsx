import React from 'react'
import {Link} from 'react-router-dom'


export const MessagesList = ({messages}) => {

    if(!messages.length){
        return <p className="center">Сообщений пока нет</p>
    }

    return (
        <div>
             <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>От кого</th>
                        <th>Сообщение</th>
                    </tr>
                </thead>

                <tbody >
                    {messages.map((message, index) =>{
                        return(
                            <tr key={message._id}>
                                <td>{index+1}</td>
                                <td>{message.userName+' '+message.surname}</td>
                                <td>{message.message}</td>
                                <td>
                                    <Link to={`/${messages._id}`}>Открыть</Link>
                                </td>
                            </tr> 
                        )
                    })}
                                    
                </tbody>
            </table>
        </div>
    )
}