import axios from "axios";
import {
  ADD_FAVORITE,
  CLEAR_DETAILS,
  CREATE_ERROR,
  CREATE_SUCCESS,
  DELETE_CHARACTER,
  DELETE_FAVORITE,
  FILTER_BY_GENDER,
  FILTER_BY_LOCATION,
  FILTER_BY_SPECIES,
  FILTER_BY_STATUS,
  FILTER_CREATED,
  GET_ALL_CHARACTERS,
  GET_BY_NAME,
  GET_DETAILS,
  GET_EPISODES,
  ORDER_BY_NAME,
  SET_CURRENT_PAGE,
  SET_FAVORITES,
  UPDATE_CHARACTER,
} from "../actionsType/actionsType";

const cache = {}; // Objeto para almacenar en caché los resultados de las llamadas a la API

export const getAllCharacters = (name = null)=>{
  return async (dispatch)=>{
    try {
      let response;
      if(name){
        response = await axios.get(`http://localhost:8000/characters?name=${name}`)
      }else{
        response = await axios.get(`http://localhost:8000/characters`)
      }
      const data = response.data.data
      // console.log(data);
      dispatch({
        type: GET_ALL_CHARACTERS,
        payload: data
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const getDetails = (id) => {
  return async (dispatch) => {
    if (cache[`details_${id}`]) {
      // Si los detalles están en caché, los obtenemos de la caché en lugar de hacer una solicitud a la API
      dispatch({
        type: GET_DETAILS,
        payload: cache[`details_${id}`],
      });
    } else {
      let dts = await axios(`http://localhost:8000/characters/${id}`);
      let response = dts.data.data[0];
      // cache[`details_${id}`] = response; ---> trae conflictos a la hora de aplicar ruta del back para actualizar personajes
      dispatch({
        type: GET_DETAILS,
        payload: response,
      });
    }
  };
};

export const getEpisodes = () => {
  return async (dispatch) => {
    let episodes = await axios.get(`http://localhost:8000/episode`);
    let response = episodes.data.data;
    // console.log(response);
    dispatch({
      type: GET_EPISODES,
      payload: response,
    });
  };
};

export const postCreate = (payload) => {
  return async (dispatch) => {
    try {
      let create = await axios.post(
        `http://localhost:8000/characters`,
        payload
      );
      let response = create.data;
      // console.log(response);
      if (response && response.data?.createCharacter) {
        dispatch({
          type: CREATE_SUCCESS,
          payload: response.data?.createCharacter,
        });
        alert("Personaje creado exitosamente");
      } else {
        dispatch({
          type: CREATE_ERROR,
          payload: "Error creating character",
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_ERROR,
        payload: error.response?.data?.error,
      });
      alert(
        error.response?.data?.error ||
          "El personaje ya existe en la base de datos"
      );
    }
  };
};

export const updateCharacter = (id, updateData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `http://localhost:8000/characters/${id}`,
        updateData
      );
      dispatch({
        type: UPDATE_CHARACTER,
        payload: {
          id,
          ...updateData,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

// export const updateCharacter = (id, updateData) => {
//   return async (dispatch) => {
//     try {
//       // Convertir el array de objetos a un array de strings
//       const updatedEpisodes = updateData.episodes.reduce((acc, episode) => {
//         if (episode.name) {
//           acc.push(episode.name);
//         }
//         return acc;
//       }, []);

//       // Actualizar el array de strings en updateData
//       updateData.episodes = updatedEpisodes;

//       const { data } = await axios.put(
//         `http://localhost:8000/characters/${id}`,
//         updateData
//       );

//       dispatch({
//         type: UPDATE_CHARACTER,
//         payload: {
//           id,
//           ...updateData,
//         },
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const deleteCharacter = (id) => {
  return async (dispatch) => {
    try {
      const confirmed = window.confirm(
        "¿Estás seguro de que deseas eliminar este personaje?"
      );
      if (!confirmed) {
        return;
      }
      let { data } = await axios.delete(
        `http://localhost:8000/characters/${id}`
      );
      dispatch({
        type: DELETE_CHARACTER,
        payload: id,
      });
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el personaje");
    }
  };
};

export const cleanDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const setCurrentPage = (page) => {
  return {
    type: SET_CURRENT_PAGE,
    payload: page,
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const filterByStatus = (payload) => {
  return {
    type: FILTER_BY_STATUS,
    payload,
  };
};

export const filterByGender = (payload) => {
  return {
    type: FILTER_BY_GENDER,
    payload,
  };
};

export const filterBySpecies = (payload) => {
  return {
    type: FILTER_BY_SPECIES,
    payload,
  };
};

export const filterByLocation = (payload) => {
  return {
    type: FILTER_BY_LOCATION,
    payload,
  };
};

export const filterCreated = (payload) => {
  return {
    type: FILTER_CREATED,
    payload,
  };
};

export const addFavorite = (character) => {
  return {
    type: ADD_FAVORITE,
    payload: character,
  };
};

export const setFavorites = (favorites) => {
  return {
    type: SET_FAVORITES,
    payload: favorites,
  };
};

export const deleteFavorite = (id) => {
  return {
    type: DELETE_FAVORITE,
    payload: id,
  };
};
