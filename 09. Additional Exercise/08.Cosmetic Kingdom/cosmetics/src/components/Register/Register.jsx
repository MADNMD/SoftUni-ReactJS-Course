import { Link } from "react-router-dom";
import { useFormik } from 'formik';

import { useAuthContext } from "../../contexts/AuthContext";

export const Register = () => {

    const { onRegisterSubmit } = useAuthContext();

    const initialValues = {
        email: '',
        password: '',
        rePassword: ''
    };

    const onSubmit = (values) => {
        onRegisterSubmit(values)
    };

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email is required!'
        }

        if (!values.password) {
            errors.password = 'Password is required!'
        }

        if (!values.rePassword) {
            errors.rePassword = 'Repeat password is required!'
        }

        if (values.password !== values.rePassword) {
            errors.password = 'Password miss match!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,
    })

    return (
        <section id="register">
            <div className="form">
                <h2>Register</h2>
                <form className="register-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        id="register-email"
                        placeholder="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <span className="errors-form">{formik.errors.email}</span> : null}
                    <input
                        type="password"
                        name="password"
                        id="register-password"
                        placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors.password ? <span className="errors-form">{formik.errors.password}</span> : null}
                    <input
                        type="password"
                        name="rePassword"
                        id="repeat-password"
                        placeholder="repeat password"
                        value={formik.values.rePassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.rePassword && formik.errors.rePassword ? <span className="errors-form">{formik.errors.rePassword}</span> : null}
                    <button type="submit">register</button>
                    <p className="message">Already registered? <Link to="/user/login">Login</Link></p>
                </form>
            </div>
        </section>
    )
}