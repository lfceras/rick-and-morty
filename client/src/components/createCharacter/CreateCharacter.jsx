import { useEffect, useState } from "react";
import "./createCharacter.css";
import { useDispatch, useSelector } from "react-redux";
import { getEpisodes, postCreate } from "../../redux/actions/actions";
import { useCallback } from "react";
import {useNavigate} from 'react-router-dom'
import NavBar from "../navBar/NavBar";

const CreateCharacter = () => {
  let dispatch = useDispatch();
  let episodes = useSelector((state) => state.episodes);
  let navigate = useNavigate()

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

  const handleChange = useCallback((e) => {
    let val = e.target.value;
    if (!val.startsWith(" ")) {
      setInput((prevState) => ({
        ...prevState,
        [e.target.name]: val,
      }));
    }
  }, []);

  const handleCheked = useCallback((e) => {
    if (e.target.checked) {
      setInput((prevState) => ({
        ...prevState,
        status: e.target.value,
      }));
    }
  }, []);

  const handleSelected = useCallback(
    (e) => {
      setInput((prevState) => ({
        ...prevState,
        episodes: [...input.episodes, e.target.value],
      }));
    },
    [input.episodes]
  );

  const handleDelete = useCallback((el) => {
    setInput((prevState) => ({
      ...prevState,
      episodes: prevState.episodes.filter((occ) => occ !== el),
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCreate(input));
    alert("Se creo el personaje")
    setInput({
      name: "",
      species: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      episodes: [],
    })
    navigate('/home')
  };

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const { name, species, status, gender, origin, location, image } = input;

  return (
    <div>
      <NavBar/>
      <div className="container-principal">
        <div className="contenedor-form">
          <h2>Crear Personaje</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Ingresa un nombre"
              />
            </label>
            <label>
              Especie
              <input
                type="text"
                name="species"
                value={species}
                onChange={handleChange}
                placeholder="Ingresa una especie"
              />
            </label>
            <div className="status">
              <label className="status2">Estatus</label>
              <div className="checkBox-container">
              <label htmlFor="checkboxAlive">
                <input
                  id = "checkboxAlive"
                  type="checkbox"
                  name="Alive"
                  value="Alive"
                  onChange={handleCheked}
                />
                Vivo
              </label>
              <label htmlFor="checkboxUnknown">
                <input
                  type="checkbox"
                  id="checkboxUnknown"
                  name="unknown"
                  value="unknown"
                  onChange={handleCheked}
                />
                Desconocido
              </label>
              <label htmlFor="checkboxDead">
                <input
                  type="checkbox"
                  id="checkboxDead"
                  name="Dead"
                  value="Dead"
                  onChange={handleCheked}
                />
                Muerto
              </label>
              </div>
            </div>

            <label>
              Genero
              <input
                type="text"
                name="gender"
                value={gender}
                onChange={handleChange}
                placeholder="Ingresa un genero"
              />
            </label>
            <label>
              Origen
              <input
                type="text"
                name="origin"
                value={origin}
                onChange={handleChange}
                placeholder="Ingresa planeta de origen"
              />
            </label>
            <label>
              Residencia
              <input
                type="text"
                name="location"
                value={location}
                onChange={handleChange}
                placeholder="Ingresa una residencia"
              />
            </label>
            <label>
              Carga una imagen
              <input
                type="text"
                name="image"
                value={image}
                onChange={handleChange}
                placeholder="Carga una imagen"
              />
            </label>

            <div>
              <select onChange={handleSelected}>
                {episodes?.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <ul>{input.episodes.map((el) => el + " ")}</ul>
            <button>Crear Personaje</button>
          </form>
          <div id="occupation">
            {input.episodes.map((el) => (
              <div key={el}>
                <p>{el}</p>
                <button onClick={() => handleDelete(el)}>X</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
