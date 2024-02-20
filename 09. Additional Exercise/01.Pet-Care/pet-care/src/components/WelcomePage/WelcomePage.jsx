import React from "react";
import styles from './WelcomePage.module.css';

export const WelcomePage = () => {
    return (
        <section className={styles['welcome-content']}>
            <article className={styles['welcome-content-text']}>
                <h1>We Care</h1>
                <h1 className={styles['bold-welcome']}>Your Pets</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
            </article>
            <article className={styles['welcome-content-image']}>
                <img src="./images/header-dog.png" alt="dog" />
            </article>
        </section>
    )
}