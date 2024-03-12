import { Link } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext";

export const Navigation = () => {

    const { isAuthenticated } = useAuthContext();

    return (
        <header>
            <Link id="logo" to="/"><img id="logo-car" src="/public/images/car-logo.png" alt="img" /></Link>
            <nav>
                <div>
                    <Link to="/catalog">Our Cars</Link>
                    <Link to="/search">Search</Link>
                </div>

                {isAuthenticated ? (

                    <div className="user">
                        <Link to="/create-car">Add Your Car</Link>
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