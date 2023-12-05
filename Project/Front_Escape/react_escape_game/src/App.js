import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccueilPage from '../src/Pages/AccueilPage';
import '../src/Styles/Style.css';
 main

const App = () => {
  return (


  <div className="App">
    <Footer />
  </div>
    <BrowserRouter>
    <Routes>
      <Route path="accueil" element={<AccueilPage />} />
    </Routes>
    </BrowserRouter>
  );
};
export default App;