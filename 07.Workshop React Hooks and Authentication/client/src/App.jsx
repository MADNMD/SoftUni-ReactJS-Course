import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { gameServiceFactory } from './services/gameService';
import { authServiceFactory } from './services/authService';
import { AuthContext } from './contexts/AuthContext';

import { Catalogue } from "./components/Catalogue"
import { CreateGame } from "./components/CreateGame"
import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { GameDetails } from './components/GameDetails';
import { EditGame } from './components/EditGame';
import { Logout } from './components/Logout';

function App() {

    const navigate = useNavigate();
    const [games, setGames] = useState([]);
    const [auth, setAuth] = useState({});
    const gameService = gameServiceFactory(auth.accessToken);
    const authService = authServiceFactory(auth.accessToken);

    useEffect(() => {
        gameService.getAll()
            .then(result => { setGames(result); })
    }, []);

    const onCreateGameSubmit = async (data) => {

        const newGame = await gameService.createGame(data);

        setGames(games => [...games, newGame]);

        navigate('/catalogue');
    }

    const onLoginSubmit = async (data) => {

        try {

            const user = await authService.login(data);

            setAuth(user);

            navigate('/catalogue');
        } catch (error) {
            console.log('There is a problem!');
        }
    }

    const onRegisterSubmit = async (data) => {

        const { confirmPassword, ...registerData } = data;

        if (confirmPassword !== registerData.password) {
            // return
            throw {
                message: 'Passwod miss match!'
            }
        }

        try {

            const user = await authService.register(registerData);

            setAuth(user);

            navigate('/catalogue');

        } catch (error) {
            console.log('There is a problem!');
        }
    }

    const onEditGameSubmit = async (values) => {

        const editGame = await gameService.editOne(values._id, values);

        setGames(games => games.map(game => game._id === values._id ? editGame : game));

        navigate(`/catalogue/${values._id}`);
    }

    const onLogout = async () => {

        await authService.logout();

        setAuth({});
    }

    const context = {
        onCreateGameSubmit,
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        userId: auth._id,
        token: auth.accessToken,
        userEmail: auth.email,
        isAuthenticated: !!auth.accessToken,
    }

    return (

        <AuthContext.Provider value={context}>
            <div id="box">

                <Header />

                <main id="main-content">

                    <Routes>
                        <Route path='/' element={<Home games={games} />} />

                        <Route path='/login' element={<Login />} />

                        <Route path='/register' element={<Register />} />

                        <Route path='/logout' element={<Logout />} />

                        <Route path='/catalogue' element={<Catalogue games={games} />} />

                        <Route path='/catalogue/:gameId' element={<GameDetails />} />

                        <Route path='/create-game' element={<CreateGame />} />

                        <Route path='/edit/:gameId' element={<EditGame onEditGameSubmit={onEditGameSubmit} />} />
                    </Routes>

                </main>

            </div>
        </AuthContext.Provider>
    )
}

export default App
