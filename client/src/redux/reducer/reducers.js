import {
  ADD_FAVORITE,
  CLEAR_DETAILS,
  DELETE_FAVORITE,
  GET_ALL_CHARACTERS,
  GET_BY_NAME,
  GET_DETAILS,
  ORDER_BY_NAME,
} from "../actionsType/actionsType";

const initialState = {
  characters: [],
  characters2: [],
  favorite: [],
  detalles: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHARACTERS:
      return {
        ...state,
        characters: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
        characters2: action.payload.sort((a, b) => a.name.localeCompare(b.name)),
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

    case GET_BY_NAME:
      return {
        ...state,
        characters: action.payload,
      };

    case ORDER_BY_NAME:
      if (action.payload === "ASC") {
        return {
          ...state,
          characters: [...state.characters].sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          }),
        };
      }
      if (action.payload === "DESC") {
        return {
          ...state,
          characters: [...state.characters].sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          }),
        };
      } else {
        return {
          ...state,
          characters: state.characters,
        };
      }

    default:
      return state;
  }
}
