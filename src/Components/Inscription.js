import axios from 'axios';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Inscription() {

  const [fullname, setfullname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate(); // Hooks comme le usestates

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(fullname);
    console.log(email);
    console.log(fullname);

    // POST http://localhost:5000/user/register
    // dans le cas de succès, redirecter l'utilisateur vers la page de connexion
    const user = { fullname, email, password }; // attributs fullname, email, password sont identiques au ceux côté serveur.
  
    axios
    .post("api/user/register", user)
    .then(() => navigate("/connexion"))
    .catch((erreur) => console.log(erreur));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="fullname" value={fullname} onChange={(event)=> setfullname(event.target.value)}/><br/><br/>
        <input type="email" placeholder="email" value={email} onChange={(event)=> setemail(event.target.value)}/><br/><br/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={(event)=> setpassword(event.target.value)}/><br/><br/>
        <button type="submit"> S'inscrire </button>
      </form>
    </div>
  )
}
