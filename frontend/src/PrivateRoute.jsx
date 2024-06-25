import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    let auth = localStorage.getItem('token')
    console.log(auth);
    return(
        auth ? <Outlet/> : <Navigate to="/" />

    )
}

export default PrivateRoute