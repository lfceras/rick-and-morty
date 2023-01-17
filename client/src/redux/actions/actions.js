import axios from 'axios'
import { GET_ALL_CHARACTERS, GET_DETAILS } from '../actionsType/actionsType'

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
