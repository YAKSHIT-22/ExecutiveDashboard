import { Navigate } from "react-router"
import { useAuthStatus } from "./useAuthStatus"

const  PublicRoute = ({children}) => {
    const {loggedIn} = useAuthStatus()
    return loggedIn?<Navigate to='/profile'/>:children
 }

export default PublicRoute