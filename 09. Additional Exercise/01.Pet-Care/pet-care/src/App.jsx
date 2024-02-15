import { Routes, Route } from 'react-router-dom';

import { CreatePage } from "./components/CreatePage";
import { Dashboard } from "./components/Dashboard";
import { DetailsPage } from "./components/DetailsPage";
import { EditPage } from "./components/EditPage/EditPage";
import { Footer } from "./components/Footer";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { WelcomePage } from "./components/WelcomePage";
import { AuthProvider } from './context/AuthContext';
import { Logout } from './components/Logout';
import { RouteGuard } from './components/RouteGuards';

function App() {

  return (
    <AuthProvider>
      <Navigation />
      <main id="content">
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/catalog' element={<Dashboard />} />
          <Route path='/user/login' element={<Login />} />
          <Route path='/user/register' element={<Register />} />
          <Route element={<RouteGuard />} >
            <Route path='/create-page' element={<CreatePage />} />
            <Route path='/details/:petId' element={<DetailsPage />} />
            <Route path='/edit/:petId' element={<EditPage />} />
          </Route>
          <Route path='/user/logout' element={<Logout />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  )
}

export default App
