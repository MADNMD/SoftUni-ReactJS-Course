import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext"
import { Navigate } from "react-router-dom";

export const Logout = () => {

    const { onLogout } = useAuthContext();

    useEffect(() => {
        onLogout()
    }, [onLogout]);

    return <Navigate to={'/user/login'}/>
}