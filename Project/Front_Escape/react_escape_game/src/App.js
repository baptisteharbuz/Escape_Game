import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccueilPage from '../src/Pages/AccueilPage';
import '../src/Styles/Style.css';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="accueil" element={<AccueilPage />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;