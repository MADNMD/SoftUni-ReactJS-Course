import { useState } from "react";

export const useForm = (initialValues, onSubmitHandler) => {

    const [values, setValues] = useState(initialValues);

    const changeHandler = (event) => {
        setValues(state => ({ ...state, [event.target.name]: event.target.value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();

        onSubmitHandler(values);

        setValues(initialValues);
    }

    const changeValues = (newValues) => {
        //TODO: Validate newValues shape (like initialValues)

        setValues(newValues);
    }

    return {
        values,
        changeHandler,
        onSubmit,
        changeValues,
    }
}