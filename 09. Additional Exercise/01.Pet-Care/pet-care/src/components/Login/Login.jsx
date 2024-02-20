import React from "react";
import styles from './Login.module.css';
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";

export const Login = () => {

    const { onLoginSubmit } = useAuthContext();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLoginSubmit);

    return (
        <section id={styles.loginPage}>
            <form method="POST" onSubmit={onSubmit} className={styles.loginForm}>
                <img src="../public/images/logo.png" alt="logo" />
                <h2>Login</h2>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                    id="email"
                     name="email" 
                     type="text" 
                     placeholder="steven@abv.bg" 
                     value={values.email}
                     onChange={changeHandler}
                     />
                </div>

                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                    id="password" 
                    name="password" 
                    type="password"
                    placeholder="********" 
                    value={values.password}
                    onChange={changeHandler}
                    />
                </div>

                <button className={styles.btn} type="submit">Login</button>

                <p className={styles.field}>
                    <span>If you don't have profile click <Link to="/register">here</Link></span>
                </p>
            </form>
        </section>
    )
}