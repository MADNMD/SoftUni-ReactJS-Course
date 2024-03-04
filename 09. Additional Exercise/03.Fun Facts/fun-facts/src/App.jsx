import { Routes, Route } from 'react-router-dom';

import { Navigation } from "./components/Navigation";
import { Footer } from './components/Footer';
import { Login } from "./components/Login/";
import { Logout } from './components/Logout';
import { Register } from "./components/Register";
import { Catalog } from "./components/Catalog";
import { CreateFact } from "./components/CreateFact";
import { EditFact } from "./components/EditFact";
import { DetailsFact } from "./components/DetailsFact";
import { Home } from './components/Home';
import { AuthProvider } from './context/AuthContext';

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
            <Route path='/create-fact' element={<CreateFact />} />
            <Route path='/edit-fact/:factId' element={<EditFact />} />
            <Route path='/details-fact/:factId' element={<DetailsFact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
