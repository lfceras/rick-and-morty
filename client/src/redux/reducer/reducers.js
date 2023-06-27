import {
  ADD_FAVORITE,
  CLEAR_DETAILS,
  DELETE_FAVORITE,
  FILTER_BY_STATUS,
  GET_ALL_CHARACTERS,
  GET_BY_NAME,
  GET_DETAILS,
  ORDER_BY_NAME,
  SET_CURRENT_PAGE,
} from "../actionsType/actionsType";

const initialState = {
  characters: [],
  characters2: [],
  favorite: [],
  detalles: {},
  currentPage: 1,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

    case GET_ALL_CHARACTERS:
  const sortedCharacters1 = action.payload.sort((a, b) => a.name.localeCompare(b.name));
  return {
    ...state,
    characters: sortedCharacters1,
    characters2: sortedCharacters1,
  };


    case ADD_FAVORITE:
  const { id } = action.payload;
  return {
    ...state,
    favorite: state.favorite.find((el) => el.id === id)
      ? [...state.favorite]
      : [...state.favorite, action.payload],
  };


    case ORDER_BY_NAME:
      let sortedCharacters = [...state.characters];
      if (action.payload === "ASC") {
        sortedCharacters.sort((a, b) => a.name.localeCompare(b.name));
      } else if (action.payload === "DESC") {
        sortedCharacters.sort((a, b) => b.name.localeCompare(a.name));
      }
      return {
        ...state,
        characters: sortedCharacters,
      };

    case FILTER_BY_STATUS:
      let characters = state.characters2;
      let statusFiltered =
        action.payload === "all"
          ? characters
          : characters.filter((el) => el.status === action.payload);
      return {
        ...state,
        characters: statusFiltered,
      };
    
    case DELETE_FAVORITE: {
      return {
        ...state,
        favorite: state.favorite.filter((el) => el.id !== action.payload),
      };
    }

    case GET_DETAILS:
      return {
        ...state,
        detalles: action.payload,
      };

    case CLEAR_DETAILS:
      return {
        ...state,
        detalles: {},
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        characters: action.payload,
        characters2: action.payload
      };

    default:
      return state;
  }
}
