import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authServiceFactory } from '../services/authService';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {

    const [auth, setAuth] = useLocaleStorage('userData', {});
    const authService = authServiceFactory(auth.accessToken);
    const navigate = useNavigate();

    const onLoginSubmit = async (data) => {

        try {

            const user = await authService.login(data);

            setAuth(user);

            navigate('/catalogue');
        } catch (error) {
            console.log('There is a problem!');
        }
    }

    const onRegisterSubmit = async (data) => {

        const { confirmPassword, ...registerData } = data;

        if (confirmPassword !== registerData.password) {
            // return
            throw {
                message: 'Passwod miss match!'
            }
        }

        try {

            const user = await authService.register(registerData);

            setAuth(user);

            navigate('/catalogue');

        } catch (error) {
            console.log('There is a problem!');
        }
    }

    const onLogout = async () => {

        await authService.logout();

        setAuth({});
    }

    const context = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    }

    return (
        <>
            <AuthContext.Provider value={context}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

export const useAuthContext = () => {

    const context = useContext(AuthContext);
    return context;
}