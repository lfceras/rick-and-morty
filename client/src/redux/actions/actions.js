import axios from "axios";
import {
  ADD_FAVORITE,
  CLEAR_DETAILS,
  DELETE_FAVORITE,
  GET_ALL_CHARACTERS,
  GET_BY_NAME,
  GET_DETAILS,
  ORDER_BY_NAME,
  SET_CURRENT_PAGE,
} from "../actionsType/actionsType";

const cache = {}; // Objeto para almacenar en caché los resultados de las llamadas a la API

export const getAllCharacters = () => {
  return async (dispatch) => {
    if (cache.allCharacters) {
      // Si los datos están en caché, los obtenemos de la caché en lugar de hacer una solicitud a la API
      dispatch({
        type: GET_ALL_CHARACTERS,
        payload: cache.allCharacters,
      });
    } else {
      let date = await axios(`http://localhost:8000/characters`);
      let response = date.data.data;
      cache.allCharacters = response; // Almacenamos los datos en caché
      dispatch({
        type: GET_ALL_CHARACTERS,
        payload: response,
      });
      // console.log(date);
    }
  };
};

export const getDetails = (id) => {
  return async (dispatch) => {
    if(cache[`details_${id}`]){
      // Si los detalles están en caché, los obtenemos de la caché en lugar de hacer una solicitud a la API
      dispatch({
        type: GET_DETAILS,
        payload: cache[`details_${id}`],
      });
    }else{
      let dts = await axios(`http://localhost:8000/characters/${id}`);
      let response = dts.data.data[0]
      cache[`details_${id}`] = response
      dispatch({
        type: GET_DETAILS,
        payload: response
      });
    }
  };
};

export const cleanDetails = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_DETAILS,
    });
  };
};

export const setCurrentPage = (page) => {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_PAGE,
      payload: page,
    });
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      let info = await axios(`http://localhost:8000/characters?name=${name}`);
      dispatch({
        type: GET_BY_NAME,
        payload: info.data.data,
      });
    } catch (error) {
      alert("Personaje no encontrado");
    }
  };
};

export const orderByName = (payload) => {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
};

export const addFavorite = (payload) => {
  return {
    type: ADD_FAVORITE,
    payload,
  };
};

export const deleteFavorite = (id) => {
  return {
    type: DELETE_FAVORITE,
    payload: id,
  };
};
