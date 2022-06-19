import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

/*
import { Navbar, Nav, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
*/


export default function Navigation() {

  const {token, settoken} = useContext(AuthContext);
 
  const logout = () => {
    localStorage.removeItem("token");
    settoken("");
  };

  return (
    <nav>
      <h1>
        <Link to="/"> Accueil </Link>
      </h1>
      {token !== "" ? (
        <>
          <Link to="/annonce"> Annonce </Link>
          <Link to="/" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link to="/connexion"> Connexion </Link>
          <Link to="/inscription"> Inscription </Link>
        </>
      )}
    </nav>
  );
}



