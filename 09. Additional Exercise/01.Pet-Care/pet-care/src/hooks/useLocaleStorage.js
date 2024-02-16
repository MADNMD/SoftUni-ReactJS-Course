import { useState } from 'react';

export const useLocaleStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {

        const userData = localStorage.getItem(key);
        if (userData) {
            const getUserData = JSON.parse(userData); 
            return getUserData;
        }
        return initialValue;
    });

    const setLocaleStorage = (value) => {
       
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));

    }
    return [
        state,
        setLocaleStorage
    ];
}