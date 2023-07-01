import { useEffect, useRef, useState } from "react";
import "./createCharacter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getEpisodes,
  postCreate,
} from "../../redux/actions/actions";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../navBar/NavBar";




const CreateCharacter = () => {
  let dispatch = useDispatch();
  let episodes = useSelector((state) => state.episodes);
  let navigate = useNavigate();
  let refInput = useRef(true)
  const [errors, setErrors] = useState({})
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

  const validate =  useCallback(
    ()=>{
      let errors = {}
      if(!input.name.trim()){
        errors.name = "Ingresa un nombre"
      }else if(input.name.length < 3){
        errors.name = "Nombre muy corto"
      }
      
      if(!input.species){
        errors.species = "Selecciona una especie"
      }

      if(!input.status){
        errors.status = "Selecciona un estatus"
      }

      if(!input.gender){
        errors.gender = "Selecciona un genero"
      }

      if(!input.origin){
        errors.origin = "Selecciona un origen"
      }

      if(!input.location){
        errors.location = "Selecciona una residencia"
      }

      if(!input.image){
        errors.image = "Selecciona una imagen"
      }

      if(input.episodes.length === 0){
        errors.episodes = "Selecciona almenos un episodio"
      }

      setErrors(errors)
    },[input]) 

  useEffect(()=>{
    validate()
  },[validate])

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

  const handleChekedGender = useCallback((e) => {
    if (e.target.checked) {
      setInput((prevState) => ({
        ...prevState,
        gender: e.target.value,
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

  const handleSelectedSpecie = useCallback((e) => {
    setInput((prevState) => ({
      ...prevState,
      species: e.target.value !== "" ? e.target.value : "",
    }));
  }, []);

  const handleSelectedOrigin = useCallback((e) => {
    setInput((prevState) => ({
      ...prevState,
      origin: e.target.value !== "" ? e.target.value : "",
    }));
  }, []);

  const handleSelectedLocation = useCallback((e) => {
    setInput((prevState) => ({
      ...prevState,
      location: e.target.value !== "" ? e.target.value : "",
    }));
  }, []);

  const handleDelete = useCallback((el) => {
    setInput((prevState) => ({
      ...prevState,
      episodes: prevState.episodes.filter((occ) => occ !== el),
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postCreate(input));
    alert("Se creo el personaje");
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
    navigate("/home");
  };



  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  const { name, image } = input;

  return (
    <div>
      <NavBar />
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
              {errors.name && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.name}</p>}
            </label>

            {/* ESPECIE */}
            <label>
              Especie
              <select
                onChange={handleSelectedSpecie}
                value={input.species}
                className="selects"
              >
                <option value="">Seleccionar especie</option>
                <option value="Human">Humano</option>
                <option value="Alien">Alien</option>
                <option value="Humanoid">Humanoide</option>
                <option value="unknown">Desconocido</option>
                <option value="Poopybutthole">Poopybutthole</option>
                <option value="Mythological Creature">
                  Criatura Mitologica
                </option>
                <option value="Animal">Animal</option>
                <option value="Robot">Robot</option>
                <option value="Cronenberg">Cronenberg</option>
                <option value="Disease">Disease</option>
              </select>
              {errors.species && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.species}</p>}
            </label>

            {/* STATUS */}
            <div className="status">
              <label className="status2">Estatus</label>
              <div className="checkBox-container">
                <label htmlFor="checkboxAlive">
                  <input
                    id="checkboxAlive"
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
              {errors.status && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.status}</p>}
            </div>

            {/* GENERO */}
            <label>
              Genero
              <div className="checkBox-container">
                <label htmlFor="checkboxMale">
                  <input
                    type="checkbox"
                    name="Male"
                    value="Male"
                    id="checkboxMale"
                    onChange={handleChekedGender}
                  />
                  Hombre
                </label>
                <label htmlFor="checkboxFemale">
                  <input
                    type="checkbox"
                    name="Female"
                    value="Female"
                    id="checkboxFemale"
                    onChange={handleChekedGender}
                  />
                  Mujer
                </label>
                <label htmlFor="checkboxunknown">
                  <input
                    type="checkbox"
                    name="unknown"
                    value="unknown"
                    id="checkboxunknown"
                    onChange={handleChekedGender}
                  />
                  Desconocido
                </label>
              </div>
              {errors.gender && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.gender}</p>}
            </label>

            {/* ORIGEN */}
            <label>Origen</label>
            <select
              onChange={handleSelectedOrigin}
              value={input.origin}
              className="selects"
            >
              <option value="">Seleccionar origen</option>
              <option value="Earth (C-137)">Earth (C-137)</option>
              <option value="unknown">unknown</option>
              <option value="Earth (Replacement Dimension)">
                Earth (Replacement Dimension)
              </option>
              <option value="Abadango">Abadango</option>
              <option value="Signus 5 Expanse">Signus 5 Expanse</option>
              <option value="Post-Apocalyptic Earth">
                Post-Apocalyptic Earth
              </option>
              <option value="Purge Planet">Purge Planet</option>
              <option value="Venzenulon 7">Venzenulon 7</option>
              <option value="Bepis 9">Bepis 9</option>
              <option value="Earth (C-500A)">Earth (C-500A)</option>
              <option value="Earth (Evil Rick's Target Dimension)">
                Earth (Evil Rick's Target Dimension)
              </option>
              <option value="Nuptia 4">Nuptia 4</option>
              <option value="Fantasy World">Fantasy World</option>
              <option value="Bird World">Bird World</option>
              <option value="Gromflom Prime">Gromflom Prime</option>
              <option value="Rick's Battery Microverse">
                Rick's Battery Microverse
              </option>
              <option value="The Menagerie">The Menagerie</option>
              <option value="Earth (K-83)">Earth (K-83)</option>
              <option value="Hideout Planet">Hideout Planet</option>
              <option value="Cronenberg Earth">Cronenberg Earth</option>
              <option value="Giant's Town">Giant's Town</option>
              <option value="Unity's Planet">Unity's Planet</option>
              <option value="Anatomy Park">Anatomy Park</option>
              <option value="Earth (J19ζ7)">Earth (J19ζ7)</option>
              <option value="Roy: A Life Well Lived">
                Roy: A Life Well Lived
              </option>
              <option value="Eric Stoltz Mask Earth">
                Eric Stoltz Mask Earth
              </option>
              <option value="Glaagablaaga">Glaagablaaga</option>
              <option value="Gazorpazorp">Gazorpazorp</option>
              <option value="Resort Planet">Resort Planet</option>
              <option value="Hamster in Butt World">
                Hamster in Butt World
              </option>
              <option value="Earth (Giant Telepathic Spiders Dimension)">
                Earth (Giant Telepathic Spiders Dimension)
              </option>
              <option value="Alphabetrium">Alphabetrium</option>
              <option value="Earth (5-126)">Earth (5-126)</option>
              <option value="Krootabulon">Krootabulon</option>
              <option value="Pluto">Pluto</option>
              <option value="Zeep Xanflorp's Miniverse">
                Zeep Xanflorp's Miniverse
              </option>
              <option value="Larva Alien's Planet">Larva Alien's Planet</option>
            </select>
            {errors.origin && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.origin}</p>}
            {/* LOCATION */}
            <label>
              Residencia
              <select
                onChange={handleSelectedLocation}
                value={input.location}
                className="selects"
              >
                <option value="">Seleccionar locacion</option>
                <option value="Citadel of Ricks">Citadel of Ricks</option>
                <option value="Earth (Replacement Dimension)">
                  Earth (Replacement Dimension)
                </option>
                <option value="Anatomy Park">Anatomy Park</option>
                <option value="Earth (C-137)">Earth (C-137)</option>
                <option value="Rick's Memories">Rick's Memories</option>
                <option value="Fantasy World">Fantasy World</option>
              </select>
              {errors.location && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.location}</p>}
            </label>

            {/* IMAGEN */}
            <label>
              Carga una imagen
              <input
                type="text"
                name="image"
                value={image}
                onChange={handleChange}
                placeholder="Carga una imagen"
              />
              {errors.image && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.image}</p>}
            </label>

            <div>
              <select onChange={handleSelected} className="episodes">
                <option value="">Seleccionar episodio</option>
                {episodes?.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
              {errors.episodes && <p style={{ color: "red", fontSize: 13, width: "238px" }}>{errors.episodes}</p>}
            </div>
            {/* <ul>{input.episodes.map((el) => el + " ")}</ul> */}
            <button
              className="btn4"
              disabled={
                input.name.trim() === "" ||
                input.species.trim() === "" ||
                input.origin.trim() === "" ||
                input.location.trim() === ""
              }
            >
              Crear Personaje
            </button>
          </form>
          
          <div className="episodes2">
            {input.episodes.map((el, index) => (
              <div key={index} className="inter">
                <button onClick={() => handleDelete(el)} className="btn5">
                  X
                </button>
                <p>{el}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacter;
