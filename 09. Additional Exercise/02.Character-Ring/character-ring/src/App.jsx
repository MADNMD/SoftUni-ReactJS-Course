import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { CreatePage } from "./components/CreatePage";
import { Dashboard } from "./components/Dashboard";
import { DetailsPage } from "./components/DetailsPage";
import { EditPage } from "./components/EditPage";
import { Footer } from "./components/Footer";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Navigation } from "./components/Navigation";
import { Register } from "./components/Register";
import { Logout } from "./components/Logout";

function App() {

  return (
    <AuthProvider>
      <>
        <div className="wrapper">
          <Navigation />
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalog' element={<Dashboard />} />
              <Route path='/create-page' element={<CreatePage />} />
              <Route path='/edit-page/:charId' element={<EditPage />} />
              <Route path='/details-page/:charId' element={<DetailsPage />} />
              <Route path='/user/login' element={<Login />} />
              <Route path='/user/register' element={<Register />} />
              <Route path="/user/logout" element={<Logout />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </>
    </AuthProvider>
  )
}

export default App
