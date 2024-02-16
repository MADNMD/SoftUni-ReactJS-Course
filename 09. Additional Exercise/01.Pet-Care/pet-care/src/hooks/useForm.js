import { useState } from "react"

export const useForm = (initialValue, onSubmitHandler) => {

    const [values, setValues] = useState(initialValue);

    const changeHandler = (event) => {
        setValues(state => ({ ...state, [event.target.name]: event.target.value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();

        onSubmitHandler(values);

    }

    const changeValues = (newValues) => {
        setValues(newValues);
    }

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    }
}