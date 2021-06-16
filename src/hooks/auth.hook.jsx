import {useState, useCallback, useEffect} from 'react'

const storageName = 'userData'

export const useAuth =()=>{
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [role, setRole] = useState('')

    const login = useCallback( (jwtToken, id, nrole)=>{
        setToken(jwtToken)
        setUserId(id)
        setRole(nrole)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, role: nrole
        }))
    },[])
    const logout = useCallback( ()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect( () =>{
        const data = JSON.parse(localStorage.getItem(storageName))

        if(data && data.token){
            login(data.token, data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId,ready, role}
}