import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accueil from "./Components/Accueil";
import Annonce from "./Components/Annonce";
import Connexion from "./Components/Connexion";
import Inscription from "./Components/Inscription";
import Navigation from "./Components/Navigation";
import { AuthContext } from "./Context/AuthContext";

// const first = useContext(AuthContext);


function App() {
  const initToken = localStorage.getItem("token")  // permet de récuperer le token car f5 ou nouvelle page tout est réinitailiser et rester connecter
  ? localStorage.getItem("token")       
  :"";

  const [token, settoken] = useState(initToken);
  return (
    <div>          
      <BrowserRouter>
        <AuthContext.Provider value={{ token, settoken}}>   
        <Navigation />
        <Routes>
          <Route path="/" element={<Accueil/>}></Route>
          <Route path="/connexion" element={<Connexion/>}></Route>
          <Route path="/annonce" element={<Annonce/>}></Route>
          <Route path="/inscription" element={<Inscription/>}></Route>
        </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
