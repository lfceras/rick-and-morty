import { GET_ALL_CHARACTERS, GET_DETAILS } from "../actionsType/actionsType"

const initialState ={
  characters: [],
  characters2: [],
  detalles: {}
}

export default function rootReducer(state= initialState, action){
  switch (action.type) {
    case GET_ALL_CHARACTERS:
      return{
        ...state,
        characters: action.payload,
        characters2: action.payload
      }

    case GET_DETAILS: 
    return{
      ...state,
      detalles: action.payload
    }  
    default:
    return state
  }
}