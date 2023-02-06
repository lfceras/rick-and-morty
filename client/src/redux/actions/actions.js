import axios from 'axios'
import { ADD_FAVORITE, CLEAR_DETAILS, DELETE_FAVORITE, GET_ALL_CHARACTERS, GET_BY_NAME, GET_DETAILS, ORDER_BY_NAME } from '../actionsType/actionsType'

export const getAllCharacters = ()=>{
  return async (dispatch)=>{
    let date = await axios(`http://localhost:3001/characters`)
    dispatch({
      type: GET_ALL_CHARACTERS,
      payload: date.data
    })
  }
}

export const getDetails = (id)=>{
  return async (dispatch)=>{
    let dts = await axios(`http://localhost:3001/characters/${id}`)
    dispatch({
      type: GET_DETAILS,
      payload: dts.data[0]
    })
  }
}

export const cleanDetails = ()=>{
  return (dispatch)=>{
    dispatch({
      type: CLEAR_DETAILS
    })
  }
}

export const getByName = (name)=>{
  return async (dispatch)=>{
    let info = await axios(`http://localhost:3001/characters?name=${name}`)
    dispatch({
      type: GET_BY_NAME,
      payload: info.data
    })
  }
}

export const orderByName = (payload)=>{
  return{
    type: ORDER_BY_NAME,
    payload
  }
}

export const addFavorite = (payload)=>{
  return{
    type: ADD_FAVORITE,
    payload
  }
}

export const deleteFavorite = (id)=>{
  return{
    type: DELETE_FAVORITE,
    payload: id
  }
}
