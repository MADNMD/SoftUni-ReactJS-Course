import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";

export const Navigation = () => {

    const { isAuthenticated } = useAuthContext();
   
    return (
        <header>
            <nav>
                <section className="logo">
                    <img src="../public/images/logo.png" alt="logo" />
                </section>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Dashboard</Link></li>
                    {!isAuthenticated &&
                        <>
                            <li><Link to="/user/login">Login</Link></li>
                            <li><Link to="/user/register">Register</Link></li>
                        </>
                    }
                    {isAuthenticated &&
                        <>
                            <li><Link to="/create-page">Create Postcard</Link></li>
                            <li><Link to="/user/logout">Logout</Link></li>
                        </>
                    }

                </ul>
            </nav>
        </header>
    )
}