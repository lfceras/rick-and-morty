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
      return {
        ...state,
        characters: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        characters2: action.payload.sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      };

    case GET_DETAILS:
      return {
        ...state,
        detalles: action.payload,
      };

    case ADD_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.find((el) => el.id === action.payload.id)
          ? [...state.favorite]
          : [...state.favorite, action.payload],
      };

    case DELETE_FAVORITE: {
      return {
        ...state,
        favorite: state.favorite.filter((el) => el.id !== action.payload),
      };
    }

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

    default:
      return state;
  }
}
