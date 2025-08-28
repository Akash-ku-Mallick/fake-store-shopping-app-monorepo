import { useAppSelector } from '../../../hooks/reduxHelper'
import { currentToken } from '../../../store/slices/authSlice'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const token = useAppSelector(currentToken)
  return (
    <>
        {token ? 
        <Navigate to={'/'} />
        :<Outlet />}
    </>
  )
}

export default AuthLayout