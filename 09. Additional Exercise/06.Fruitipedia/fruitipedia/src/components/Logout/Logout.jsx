import { useEffect } from "react";

import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";


export const Logout = () => {

    const { onLogoutSubmit } = useAuthContext();

    useEffect(() => {
        onLogoutSubmit();
    }, [onLogoutSubmit])

    return(
        <Navigate to={'/user/login'} />
    )
}