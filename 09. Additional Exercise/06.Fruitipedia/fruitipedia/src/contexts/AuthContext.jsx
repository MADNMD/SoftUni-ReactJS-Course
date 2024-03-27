import { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom'

import { useLocaleStorage } from "../hooks/useLocaleStorage";
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {

    const [auth, setAuth] = useLocaleStorage('userData', {});

    const navigate = useNavigate();

    const onLoginSubmit = async (userData) => {

        try {
            const user = await authService.login(userData);

            setAuth(user);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onRegisterSubmit = async (userData) => {

        try {
            const newUser = await authService.register(userData);

            setAuth(newUser);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const onLogoutSubmit = async () => {

        try {
            authService.logout();

            setAuth({});

            navigate('/user/login');
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogoutSubmit,
        userId: auth._id,
        email: auth.email,
        token: auth.accessToken,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
}