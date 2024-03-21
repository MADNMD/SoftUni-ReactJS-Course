import { Routes, Route } from 'react-router-dom';

import { Catalog } from "./components/Catalog";
import { CreatePage } from "./components/CreatePage";
import { DetailsPage } from "./components/DetailsPage";
import { EditPage } from "./components/EditPage";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { Search } from "./components/Search";
import { AuthProvider } from './contexts/AuthContext';
import { Logout } from './components/Logout';
import { RouteGuardsGuest } from './components/RouteGuardsGuest';
import { RouteGuardsUsers } from './components/RouteGuardsUsers';

function App() {

    return (
        <AuthProvider>
            <div id='wrapper'>
                <Navigation />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route element={<RouteGuardsUsers />}>
                            <Route path='/user/register' element={<Register />} />
                            <Route path='/user/login' element={<Login />} />
                        </Route>
                        <Route element={<RouteGuardsGuest />}>
                            <Route path='/user/logout' element={<Logout />} />
                            <Route path='/create-page' element={<CreatePage />} />
                            <Route path='/edit-page/:fruitId' element={<EditPage />} />
                        </Route>
                        <Route path='/details-page/:fruitId' element={<DetailsPage />} />
                        <Route path='/search' element={<Search />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App
