import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import * as gameService from './services/gameService';

import { Catalogue } from "./components/Catalogue"
import { CreateGame } from "./components/CreateGame"
import { Header } from "./components/Header"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { GameDetails } from './components/GameDetails';
import { EditGame } from './components/EditGame';

function App() {

    const navigate = useNavigate();
    const [games, setGames] = useState([]);

    useEffect(() => {
        gameService.getAll()
            .then(result => { setGames(result); })
    }, [games]);

    const onCreateGameSubmit = async (data) => {

        const newGame = await gameService.createGame(data);

        setGames(games => [...games, newGame]);

        navigate('/catalogue');
    }

    return (

        <div id="box">

            <Header />

            <main id="main-content">

                <Routes>
                    <Route path='/' element={<Home games={games} />} />

                    <Route path='/login' element={<Login />} />

                    <Route path='/register' element={<Register />} />

                    <Route path='/catalogue' element={<Catalogue games={games} />} />

                    <Route path='/catalogue/:gameId' element={<GameDetails />} />

                    <Route path='/create-game' element={<CreateGame onCreateGameSubmit={onCreateGameSubmit} />} />

                    <Route path='/edit/:gameId' element={<EditGame />} />
                </Routes>

            </main>

        </div>

    )
}

export default App
