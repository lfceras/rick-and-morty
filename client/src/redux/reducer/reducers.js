import { ADD_FAVORITE, CLEAR_DETAILS, DELETE_FAVORITE, GET_ALL_CHARACTERS, GET_BY_NAME, GET_DETAILS } from "../actionsType/actionsType"

const initialState ={
  characters: [],
  characters2: [],
  favorite: [],
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

    case ADD_FAVORITE:
      return{
        ...state,
        favorite: state.favorite.find(el => el.id === action.payload.id)
        ? [...state.favorite]
        : [...state.favorite, action.payload]
      }

    case DELETE_FAVORITE:{
      return{
        ...state,
        favorite: state.favorite.filter(el => el.id !== action.payload)
      }
    }

    case CLEAR_DETAILS:
      return{
        ...state,
        detalles:{}
      }

    case GET_BY_NAME: 
    return{
      ...state,
      characters: action.payload
    }

    default:
    return state
  }
}