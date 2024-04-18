import { Link } from "react-router-dom";

import { useAuthContext } from '../../contexts/AuthContext';

export const Navigation = () => {

    const { isAuthenticated } = useAuthContext();

    return (
        <header>
            <Link id="logo" to="/"><img id="logo-img" src="./images/logo.png" alt="" /></Link>
            <nav>
                <div>
                    <Link to="/catalog">Products</Link>
                </div>

                {isAuthenticated ? (
                    <div className="user">
                        <Link to="/create">Add Product</Link>
                        <Link to="/user/logout">Logout</Link>
                    </div>
                ) : (
                <div className="guest">
                    <Link to="/user/login">Login</Link>
                    <Link to="/user/register">Register</Link>
                </div>
                )}
            </nav>
        </header>
    )
}