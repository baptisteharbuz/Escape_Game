
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import AuthContext from '../src/Context/AuthContext';
import { ToastContainer } from 'react-toastify';
// STYLES
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Styles/Style.css';
import '../src/Styles/HeaderStyle.css';
import '../src/Styles/App.css';
import '../src/Styles/TextStyle.css';
// COMPONENTS
import Footer from "./Components/Footer";
import NavBar from "./Components/HeaderComponent";
// PAGES
import AccueilPage from '../src/Pages/AccueilPage';
import ChezNousPage from "../src/Pages/ChezNousPage";
import ChezVousPage from "../src/Pages/ChezVousPage";
import JeuxMysterePage from "../src/Pages/JeuxMysterePage";
import ContactPage from "../src/Pages/ContactPage";
import InscriptionPage from "../src/Pages/InscriptionPage";
import PhotoPage from "../src/Pages/PhotoPage";
import ConnexionPage from "../src/Pages/ConnexionPage";
import PanierPage from "./Pages/PanierPage";
import SalleDetailPage from "../src/Pages/SalleDetailPage";
import ProfilPage from "./Pages/ProfilePage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});


  return (
    <>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
        <div>
          <BrowserRouter>
            <NavBar />
            <div className="video-background">
              <video autoPlay loop muted className="fullscreen-video">
                <source src="/videos/Texture.mp4" type="video/mp4"></source>
              </video>
            </div>
            <Routes>
              <Route path={'/accueil'} element={<AccueilPage />} />
              <Route path={'/cheznous'} element={<ChezNousPage />} />
              <Route path={'/chezvous'} element={<ChezVousPage />} />
              <Route path={'/salle/:salle_id'} element={<SalleDetailPage />} />
              <Route path={'/jeuxmystere'} element={<JeuxMysterePage />} />
              <Route path={'/photo'} element={<PhotoPage />} />
              <Route path={'/contact'} element={<ContactPage />} />
              <Route path={'/connexion'} element={<ConnexionPage />} />
              <Route path={'/inscription'} element={<InscriptionPage />} />
              <Route path={'/panier'} element={<PanierPage />} />
              <Route path={'/profil'} element={<ProfilPage />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
      </AuthContext.Provider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
export default App;