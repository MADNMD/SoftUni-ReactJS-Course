import { Routes, Route } from 'react-router-dom'

import { Catalog } from "./components/Catalog"
import { Create } from "./components/Create"
import { Details } from "./components/Details"
import { Edit } from "./components/Edit"
import { Footer } from "./components/Footer"
import { Home } from "./components/Home"
import { Login } from "./components/Login"
import { Navigation } from "./components/Navigation"
import { Register } from "./components/Register"
import { AuthProvider } from './contexts/AuthContext'
import { Logout } from './components/Logout'

function App() {

    return (
        <AuthProvider>
            <div id="wrapper">
                <Navigation />
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/user/login' element={<Login />} />
                        <Route path='/user/register' element={<Register />} />
                        <Route path='/user/logout' element={<Logout />} />
                        <Route path='/catalog' element={<Catalog />} />
                        <Route path='/create' element={<Create />} />
                        <Route path='/details/:productId' element={<Details />} />
                        <Route path='/edit/:productId' element={<Edit />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </AuthProvider>
    )
}

export default App
