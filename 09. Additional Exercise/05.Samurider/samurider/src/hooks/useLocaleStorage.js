import { useState } from "react";

export const useLocaleStorage = (key, initialValues) => {

    const [state, setState] = useState(() => {

        const userData = localStorage.getItem(key);

        if (userData) {
            const getUserData = JSON.parse(userData);
            return getUserData;
        }
        return initialValues;
    });

    const setLocaleStorage = (values) => {

        setState(values);

        localStorage.setItem(key, JSON.stringify(values));
    }
    return [
        state,
        setLocaleStorage,
    ]
}