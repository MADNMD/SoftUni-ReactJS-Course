import { useState } from "react";

export const useLocaleStorage = (key, initialValue) => {  // това го подават в authContext

    const [state, setState] = useState(() => {

        const persistedStateSerialized = localStorage.getItem(key);
        if(persistedStateSerialized){
            const presistedState = JSON.parse(persistedStateSerialized);
            return presistedState
        }
        return initialValue;
    });

    const setLocaleStorage = (value) => {

        setState(value);

        localStorage.setItem(key, JSON.stringify(value));

    }

    return [
        state,
        setLocaleStorage,
    ]
}

// използваме го в requester.js