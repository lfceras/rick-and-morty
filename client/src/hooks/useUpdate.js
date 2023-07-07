import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getEpisodes, getDetails, updateCharacter } from "../../src/redux/actions/actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export function useUpdate() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const {id} = useParams()
  let details = useSelector(state => state.detalles)
  const [input, setInput] = useState({
    name: "",
    species: "",
    status: "",
    gender: "",
    origin: "",
    location: "",
    image: "",
    episodes: [],
  });
// console.log(input);
  useEffect(() => {
    dispatch(getEpisodes());
    if(id){
      dispatch(getDetails(id))
    }
  }, [dispatch, id]);

  useEffect(()=>{
    if(id && details){
      setInput(details)
    }
  },[id, details])


  // const isUpdating = useRef(false)

  const [loading, setLoading] = useState(false)

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await dispatch(updateCharacter(id, input));
      await dispatch(getDetails(id));
      setLoading(false)
      alert("Personaje actualizado exitosamente")
      navigate('/home')
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  };

  return {
    input,
    setInput,
    handleUpdate,
    loading
  };
}
