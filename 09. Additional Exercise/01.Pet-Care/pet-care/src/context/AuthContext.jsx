import { createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';

import * as authService from '../services/authService';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

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
            console.log('Misho', error)
            alert(error);
        }
    }

    const onRegisterSubmit = async (userData) => {

        try {
            
            const registerUser = await authService.register(userData);

            setAuth(registerUser);

            navigate('/catalog');
        } catch (error) {
            
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
        email: auth.email,
        token: auth.accessToken,
        userId: auth._id,
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