import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { useAuthContext } from "../../context/AuthContext";

export const Login = () => {

    const { onLoginSubmit } = useAuthContext();

    const initialValues = {
        email: '',
        password: ''
    }

    const onSubmit = (values) => {
        onLoginSubmit(values)
    }

    const validate = (values) => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email is required!'
        }

        if (!values.password) {
            errors.password = 'Password is required!'
        }
        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate,

    });

    return (
        <section id="login">
            <div className="form">
                <h2>Login</h2>
                <form className="login-form" onSubmit={formik.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <span className="errors-form">{formik.errors.email}</span> : null}
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.password && formik.errors ? <span className="errors-form">{formik.errors.email}</span> : null}
                    <button type="submit">login</button>
                    <p className="message">
                        Not registered? <Link to="/user/register">Create an account</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}