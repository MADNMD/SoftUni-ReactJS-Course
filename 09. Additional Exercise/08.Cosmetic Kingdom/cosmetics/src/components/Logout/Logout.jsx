import { useEffect } from "react";
import { Navigate } from 'react-router-dom'

import { useAuthContext } from "../../contexts/AuthContext";

export const Logout = () => {

    const { onLogoutSubmit } = useAuthContext();

    useEffect(() => {
        onLogoutSubmit();
    }, [onLogoutSubmit]);

    return <Navigate to={'/user/login'} />
}