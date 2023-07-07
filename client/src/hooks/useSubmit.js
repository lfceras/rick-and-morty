import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { postCreate, getEpisodes} from "../../src/redux/actions/actions";
import { useCallback } from "react";
// import { useNavigate } from "react-router-dom";

export function useSubmit() {
  // let navigate = useNavigate();
  let dispatch = useDispatch();

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
  const [errors, setErrors] = useState({});

  const validate = useCallback(() => {
    let errors = {};
    if (!input.name) {
      errors.name = "Ingresa un nombre";
    } else if (input.name.length < 3) {
      errors.name = "Nombre muy corto";
    }

    if (!input.species) {
      errors.species = "Selecciona una especie";
    }

    if (!input.status) {
      errors.status = "Selecciona un estatus";
    }

    if (!input.gender) {
      errors.gender = "Selecciona un genero";
    }

    if (!input.origin) {
      errors.origin = "Selecciona un origen";
    }

    if (!input.location) {
      errors.location = "Selecciona una residencia";
    }

    if (!input.image) {
      errors.image = "Selecciona una imagen";
    }

    if (!input.episodes) {
      errors.episodes = "Selecciona almenos un episodio";
    }

    setErrors(errors);
  }, [input]);

  useEffect(() => {
    validate();
  }, [validate]);

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCreate(input));
    setInput({
      name: "",
      species: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      episodes: [],
    });
  };

  return {
    input,
    setInput,
    handleSubmit,
    errors
  };
}
