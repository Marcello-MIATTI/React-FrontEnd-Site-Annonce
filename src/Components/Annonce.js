import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";


export default function Annonce() {
  const [nom, setnom] = useState("");
  const [prix, setprix] = useState("");
  const [description, setdescription] = useState("");
  const [photo, setphoto] = useState("");
  const [qteDispo, setqteDispo] = useState("");
  const [id, setid] = useState("");

  const [listAnnonce, setlistAnnonce] = useState([]);

  const { token } = useContext(AuthContext);

  // se déclanche une seul fois lorsque le composant est chargé
  // permet de récuperer la liste d'annonce de l'utilisateur connecté
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // "Bearer " + token
      },
    };

    axios
      .get("/api/annonce/getAnnonceUser", config)
      .then((res) => setlistAnnonce(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Créer une nouvelle annonce
  const createAnnonce = () => {
    const annonce = { nom, prix, description, photo, qteDispo };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // "Bearer " + token
      },
    };
    // nom === "" || prix == ""
    if (!nom || !prix || !description || !photo || !qteDispo) {
      return alert("veuillez saisir les info du formulaire");
    }

    axios
      .post("/api/annonce", annonce, config)
      .then((res) => {
        setlistAnnonce([res.data, ...listAnnonce]);
        setnom("");
        setprix("");
        setdescription("");
        setphoto("");
        setqteDispo("");
      })
      .catch((err) => console.log(err));
  };

  // permet de supprimer une annonce
  const deleteAnnonce = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // "Bearer " + token
      },
    };

    axios
      .delete(`/api/annonce/${id}`, config)
      .then((res) => {
        setlistAnnonce(listAnnonce.filter((annonce) => annonce._id !== id));
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // Mettre à jours le formulaire ( mettre à jours les variables d'état )
  const updateForm = (annonce) => {
    setid(annonce._id);
    setnom(annonce.nom);
    setprix(annonce.prix);
    setdescription(annonce.description);
    setphoto(annonce.photo);
    setqteDispo(annonce.qteDispo);
  };

  // Mettre à jours une annonce
  const updateAnnonce = () => {
    // validation du formulaire
    if (!id) {
      return alert("veuillez préciser l'annonce a mettre à jours");
    }

    if (!nom || !prix || !description || !photo || !qteDispo) {
      return alert("veuillez saisir les info du formulaire");
    }

    const annonce = { nom, prix, description, photo, qteDispo };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(`/api/annonce/${id}`, annonce, config)
      .then((res) => {
        const tmp = listAnnonce.filter((annonce) => annonce._id !== id);
        setlistAnnonce([res.data, ...tmp]);
        setnom("");
        setprix("");
        setdescription("");
        setphoto("");
        setqteDispo("");
        setid("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      Annonce
      <div>
        <input
          type="text"
          placeholder="nom"
          value={nom}
          onChange={(e) => setnom(e.target.value)}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Prix"
          value={prix}
          onChange={(e) => setprix(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <br />
        <br />
        <input
          type="text"
          placeholder="Photo de l'annonce"
          value={photo}
          onChange={(e) => setphoto(e.target.value)}
        />
        <br />
        <br />
        <input
          type="number"
          placeholder="Quantité disponible"
          value={qteDispo}
          onChange={(e) => setqteDispo(e.target.value)}
        />
        <br />
        <br />
        <button onClick={createAnnonce}> Créer l'annonce </button>
        <button onClick={updateAnnonce}> update l'annonce </button>
      </div>
      {listAnnonce.map((annonce) => {
        return (
          <div key={annonce._id}>
            <h1> nom: {annonce.nom} </h1>
            <p> prix: {annonce.prix} € </p>
            <p> Quantité disponible: {annonce.qteDispo} </p>
            <p> description: {annonce.description} </p>
            <button onClick={() => deleteAnnonce(annonce._id)}> Delete </button>
            <button onClick={() => updateForm(annonce)}> Update </button>
          </div>
        );
      })}
    </div>
  );
}
