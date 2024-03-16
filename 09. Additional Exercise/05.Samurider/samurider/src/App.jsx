import { Routes, Route } from 'react-router-dom';

import { Catalog } from "./components/Catalog";
import { CreatePage } from "./components/CreataPage";
import { DetailsPage } from "./components/DetailsPage";
import { EditPage } from "./components/EditPage";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { Search } from "./components/Search";
import { Logout } from './components/Logout';
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
            <Route path='/create-page' element={<CreatePage />} />
            <Route path='/edit-page/:motoId' element={<EditPage />} />
            <Route path='/details-page/:motoId' element={<DetailsPage />} />
            <Route path='/serach' element={<Search />} />
          </Routes>
        </main>
      </div>
       </AuthProvider>
  )
}

export default App
