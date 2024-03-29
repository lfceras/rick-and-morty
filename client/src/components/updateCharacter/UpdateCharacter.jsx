import "../createCharacter/createCharacter.css";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import NavBar from "../navBar/NavBar";
import { useUpdate } from "../../hooks/useUpdate";

const UpdateCharacter = () => {
  const { formik } = useUpdate();

  let episodes = useSelector((state) => state.episodes);

  // const handleChange = useCallback((e) => {
  //   let val = e.target.value;
  //   if (!val.startsWith(" ")) {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       [e.target.name]: val,
  //     }));
  //   }
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  // const handleSelectedSpecie = useCallback((e) => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     species: e.target.value !== "" ? e.target.value : "",
  //   }));
  // }, []);

  const handleSelectedSpecie = useCallback((e) => {
    formik.setFieldValue(
      "species",
      e.target.value !== "" ? e.target.value : ""
    );
  }, []);

  // const handleCheked = useCallback((e) => {
  //   if (e.target.checked) {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       status: e.target.value,
  //     }));
  //   }
  // }, []);

  const handleChekedStatus = useCallback((e) => {
    const { value, checked } = e.target;
    formik.setFieldValue("status", checked ? value : "");
  }, []);

  // const handleChekedGender = useCallback((e) => {
  //   if (e.target.checked) {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       gender: e.target.value,
  //     }));
  //   }
  // }, []);

  const handleChekedGender = useCallback((e) => {
    const { value, checked } = e.target;
    formik.setFieldValue("gender", checked ? value : "");
  }, []);

  // const handleSelectedOrigin = useCallback((e) => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     origin: e.target.value !== "" ? e.target.value : "",
  //   }));
  // }, []);

  const handleSelectedOrigin = useCallback((e) => {
    formik.setFieldValue("origin", e.target.value !== "" ? e.target.value : "");
  }, []);

  // const handleSelectedLocation = useCallback((e) => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     location: e.target.value !== "" ? e.target.value : "",
  //   }));
  // }, []);

  const handleSelectedLocation = useCallback((e) => {
    formik.setFieldValue(
      "location",
      e.target.value !== "" ? e.target.value : ""
    );
  }, []);

  // const handleSelected = useCallback(
  //   (e) => {
  //     setInput((prevState) => ({
  //       ...prevState,
  //       episodes: [...input.episodes, e.target.value],
  //     }));
  //   },
  //   [input.episodes]
  // );

  // const handleSelectedEpisodes = useCallback(
  //   (e) => {
  //     formik.setFieldValue("episodes", [
  //       ...formik.values.episodes,
  //       e.target.value,
  //     ]);
  //   },
  //   [formik.values.episodes]
  // );

  const handleSelectedEpisodes = useCallback(
    (e) => {
      const selectedEpisodeName = e.target.value;
      if (selectedEpisodeName) {
        formik.setFieldValue("episodes", [...formik.values.episodes, selectedEpisodeName]);
      }
      console.log(formik.values.episodes, "update")
    },
    [formik.values.episodes]
  );
  

  // const handleDelete = useCallback((el) => {
  //   setInput((prevState) => ({
  //     ...prevState,
  //     episodes: prevState.episodes.filter((occ) => occ !== el),
  //   }));
  // }, []);

  const handleDelete = useCallback(
    (episode) => {
      const deleteEpisodes = formik.values.episodes.filter(
        (e) => e !== episode
      );
      formik.setFieldValue("episodes", deleteEpisodes);
    },
    [formik.values.episodes]
  );

  useEffect(() => {
    document.title = "Actualizar Personaje";
  }, []);

  return (
    <div>
      <NavBar />
      <div className="container-principal">
        <div className="contenedor-form">
          <h2>Crear Personaje</h2>
          <form onSubmit={formik.handleSubmit}>
            <label>
              Name
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Ingresa un nombre"
              />
            </label>

            {/* ESPECIE */}
            <label>
              Especie
              <select
                name="species"
                onChange={handleSelectedSpecie}
                value={formik.values.species}
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
                    checked={formik.values.status === "Alive"}
                    onChange={handleChekedStatus}
                  />
                  Vivo
                </label>
                <label htmlFor="checkboxUnknown">
                  <input
                    type="checkbox"
                    id="checkboxUnknown"
                    name="unknown"
                    value="unknown"
                    checked={formik.values.status === "unknown"}
                    onChange={handleChekedStatus}
                  />
                  Desconocido
                </label>
                <label htmlFor="checkboxDead">
                  <input
                    type="checkbox"
                    id="checkboxDead"
                    name="Dead"
                    value="Dead"
                    checked={formik.values.status === "Dead"}
                    onChange={handleChekedStatus}
                  />
                  Muerto
                </label>
              </div>
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
                    checked={formik.values.gender === "Male"}
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
                    checked={formik.values.gender === "Female"}
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
                    checked={formik.values.gender === "unknown"}
                    onChange={handleChekedGender}
                  />
                  Desconocido
                </label>
              </div>
            </label>

            {/* ORIGEN */}
            <label>Origen</label>
            <select
              name="origin"
              onChange={handleSelectedOrigin}
              value={formik.values.origin}
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
            {/* LOCATION */}
            <label>
              Residencia
              <select
                name="location"
                onChange={handleSelectedLocation}
                value={formik.values.location}
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
            </label>

            {/* IMAGEN */}
            <label>
              Carga una imagen
              <input
                type="text"
                name="image"
                value={formik.values.image}
                onChange={handleChange}
                placeholder="Carga una imagen"
              />
            </label>

            {/* EPISODES */}

            <div>
              <select
                name="episodes"
                onChange={(e) => handleSelectedEpisodes(e)}
                className="episodes"
                disabled={true}
              >
                <option value="">Seleccionar episodio</option>

                {episodes &&  episodes?.map((el) => (
                  <option key={el.id} value={el.name}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn4" type="submit">
              Actualizar Personaje
            </button>
          </form>

          <div className="episodes2">
            {formik.values.episodes?.map((el, index) => (
              <div key={index} className="inter">
                <button onClick={() => handleDelete(el)} className="btn5"
                disabled={true}
                >
                  X
                </button>
                <p>{el.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCharacter;
