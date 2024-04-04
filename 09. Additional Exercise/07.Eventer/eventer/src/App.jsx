import { Routes, Route } from 'react-router-dom'

import { CreatePage } from "./components/Create"
import { Dashboard } from "./components/Dashboard"
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
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/user/register' element={<Register />} />
                        <Route path='/user/login' element={<Login />} />
                        <Route path='/create-page' element={<CreatePage />} />
                        <Route path='/details/:eventId' element={<Details />} />
                        <Route path='/edit/:eventId' element={<Edit />} />
                        <Route path='/user/logout' element={<Logout />} />
                    </Routes>
                </main>
            </div>
            <Footer />
        </AuthProvider>
    )
}

export default App
