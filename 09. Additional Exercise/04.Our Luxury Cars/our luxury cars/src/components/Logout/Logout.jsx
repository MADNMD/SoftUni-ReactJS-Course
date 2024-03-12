import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export const Logout = () => {

    const { logoutSubmit } = useAuthContext();

    useEffect(() => {
        logoutSubmit()
    }, [logoutSubmit]);

    return <Navigate to={'/user/login'}/>
}