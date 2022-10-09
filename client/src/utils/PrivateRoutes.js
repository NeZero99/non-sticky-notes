import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
return (
    user ? <Outlet/> : <Navigate to='/login'/>
  )
}

export default PrivateRoutes;