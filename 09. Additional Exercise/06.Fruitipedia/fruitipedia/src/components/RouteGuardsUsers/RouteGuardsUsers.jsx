import { Navigate, Outlet } from "react-router-dom";

import { useAuthContext } from "../../contexts/AuthContext";

export const RouteGuardsUsers = () => {

    const { isAuthenticated } = useAuthContext();

    if (isAuthenticated) {
        return <Navigate to={'/catalog'} />
    }

    return <Outlet />

}