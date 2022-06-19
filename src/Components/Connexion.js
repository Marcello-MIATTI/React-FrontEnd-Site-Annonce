import React, { useContext, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';


export default function Connexion() {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const { settoken} = useContext(AuthContext);

  const Connexion = (event) => {
    event.preventDefault();
    const user = { email, password};

    axios
    .post("api/user/login", user)  // user correspond aux données renvoyées
    .then((resultat) => {
    // sauvegarder le token dans le local storage
    // sauvegarder le token dans le context de l'application
    // navigate l'utilisateur vers la page d'accueil
    localStorage.setItem("token", resultat.data);  // on stoke le token dans le navigateur
    settoken(resultat.data); // On mets à jour le token 
    navigate("/"); // on redirige vers la page d'accueil
    })
    .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={Connexion}>
        <input type="email" placeholder="email" value={email} onChange={(event)=> setemail(event.target.value)}/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(event)=> setpassword(event.target.value)}/>
        <button type="submit"> Se connecter </button>
      </form>
    </div>
  )
}



