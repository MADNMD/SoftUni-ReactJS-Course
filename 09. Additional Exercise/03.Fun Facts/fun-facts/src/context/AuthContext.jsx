import { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';
import { useLocaleStorage } from "../hooks/useLocaleStorage";

const AuthContext = createContext();

export const AuthProvider = ({
    children
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
            alert(error);
        }
    }

    const onRegisterSubmit = async (userData) => {

        try {

            const newUser = await authService.register(userData);

            setAuth(newUser);

            navigate('/catalog');
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const onLogout = async () => {

        try {

            await authService.logout();

            setAuth({});

            navigate('/user/login');
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        email: auth.email,
        userId: auth._id,
        token: auth.accessToken,
        isAuthenticated: !!auth.accessToken
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