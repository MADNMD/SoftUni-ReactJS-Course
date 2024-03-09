import { Routes, Route } from 'react-router-dom';

import { CreatePage } from "./components/CreatePage";
import { Dashboard } from "./components/Dashboard";
import { DetailsPage } from "./components/DetailsPage";
import { EditPage } from "./components/EditPage";
import { Home } from "./components/Home";
import { Login } from "./components/Login/";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { Search } from "./components/Search";
import { AuthProvider } from './context/AuthContext';
import { Logout } from './components/Logout';

function App() {

  return (
    <AuthProvider>
      <div id="wrapper">
        <Navigation />
        <main id="main-element">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user/login' element={<Login />} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/user/logout' element={<Logout />}/>
            <Route path='/catalog' element={<Dashboard />} />
            <Route path='/create-car' element={<CreatePage />} />
            <Route path='/edit-page/:carId' element={<EditPage />} />
            <Route path='/details-page/:carId' element={<DetailsPage />} />
            <Route path='/search' element={<Search />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

export default App
