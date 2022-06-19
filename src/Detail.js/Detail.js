import React, { useState } from 'react';
import { useParams} from 'react-router-dom';
import axios from 'axios';

export default function Detail() {
    const {id} = useParams();
    console.log(id);

    const [detail, setdetail] = useState("");


// useeffect pas de config , pas de liste 1 obj
useEffect(() => {
    
    axios
    .get(`/api/annonce/${id}`)
    .then((res) => console.log(err))
    .catch((err) => console.log(err));
},[]);






  return (
    <div>Detail</div>
  )

  }