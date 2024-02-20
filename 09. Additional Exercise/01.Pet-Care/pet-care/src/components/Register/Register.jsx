import React from "react";
import styles from './Register.module.css';

import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

export const Register = () => {

    const { onRegisterSubmit } = useAuthContext();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
        repeatPassword: '',
    }, onRegisterSubmit);

    return (
        <section id={styles.registerPage}>
            <form method="POST" onSubmit={onSubmit} className={styles.registerForm}>
                <img src="../public/images/logo.png" alt="logo" />
                <h2>Register</h2>
                <div className={styles['on-dark']}>
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

                <div className={styles['on-dark']}>
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

                <div className={styles['on-dark']}>
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input
                        id="repeatPassword"
                        name="repeatPassword"
                        type="password"
                        placeholder="********"
                        value={values.repeatPassword}
                        onChange={changeHandler}
                    />
                </div>

                <button className={styles.btn} type="submit">Register</button>

                <p className={styles.field}>
                    <span>If you have profile click <Link to="/login">here</Link></span>
                </p>
            </form>
        </section>
    )
}