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
  POST_CHARACTERS,
  SET_CURRENT_PAGE,
  SET_FAVORITES,
  UPDATE_CHARACTER,
} from "../actionsType/actionsType";

const initialState = {
  characters: [],
  characters2: [],
  favorite: [],
  detalles: {},
  currentPage: 1,
  episodes: [],
  error: null,
  createSuccess: false,
  charactersExist: false,
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CHARACTERS:
      const sortedCharacters1 = action.payload.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      // ---> con este sorted characters no me permitia hacer el debounce de manera adecuada por eso lo comente
      return {
        ...state,
        characters: sortedCharacters1,
        characters2: sortedCharacters1,
      };

    case ADD_FAVORITE:
      // const { id } = action.payload;
      let favs = state.favorite
      if(favs.length >= 8){
        return state
      }
      const newFavorite = action.payload
      const isDuplicated = state.favorite.some((fav)=> fav.id === newFavorite.id)
      if(!isDuplicated){
        return{
          ...state,
          favorite: [...state.favorite, newFavorite]
        }
      }
      return state;

    case SET_FAVORITES:
      return {
        ...state,
        favorite: [...state.favorite, ...action.payload],
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

    case FILTER_BY_GENDER:
      let charactersGender = state.characters2;
      let genderfiltered =
        action.payload === "all"
          ? charactersGender
          : charactersGender.filter((el) => el.gender === action.payload);
      return {
        ...state,
        characters: genderfiltered,
      };

    case FILTER_BY_SPECIES:
      let characterSpecies = state.characters2;
      let speciefiltered =
        action.payload === "all"
          ? characterSpecies
          : characterSpecies.filter((el) => el.species === action.payload);
      return {
        ...state,
        characters: speciefiltered,
      };

    case FILTER_BY_LOCATION:
      let characterLocation = state.characters2;
      let locationFiltered =
        action.payload === "all"
          ? characterLocation
          : characterLocation.filter((el) => el.location === action.payload);
      return {
        ...state,
        characters: locationFiltered,
      };

    case FILTER_CREATED:
      const personajes = state.characters2;
      const createdFiltered =
        action.payload === "created"
          ? personajes.filter((el) => el.create)
          : personajes.filter((el) => !el.create);
      return {
        ...state,
        characters:
          action.payload === "all" ? state.characters2 : createdFiltered,
        charactersExist: createdFiltered.length > 0,
      };

    case GET_EPISODES:
      return {
        ...state,
        episodes: action.payload,
      };

    case POST_CHARACTERS:
      return {
        ...state,
        characters: [...state.characters, action.payload],
      };

    case UPDATE_CHARACTER:
      return {
        ...state,
        characters: state.characters.map((character) => {
          if (character.id === action.payload.id) {
            return {
              ...character,
              ...action.payload,
            };
          }
          return character;
        }),
      };

    case DELETE_CHARACTER:
      return {
        ...state,
        characters: state.characters.filter(
          (character) => character.id !== action.payload.id
        ),
      };

    case CREATE_SUCCESS:
      return {
        ...state,
        characters: [...state.characters, action.payload],
        createSuccess: true,
        error: null,
      };

    case CREATE_ERROR:
      return {
        ...state,
        createSuccess: false,
        error: action.payload,
      };

    case DELETE_FAVORITE: {
      const filteredFavorites = state.favorite.filter(
        (fav) => fav.id !== action.payload
      );
      return {
        ...state,
        favorite: filteredFavorites,
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
      // console.log('Previo a la actualización: ', state.currentPage);
      // console.log('Nuevo valor: ', action.payload);
      return {
        ...state,
        currentPage: action.payload,
      };

    // case GET_BY_NAME:
    //   return {
    //     ...state,
    //     characters: action.payload,
    //     characters2: action.payload,
    //   };

    default:
      return state;
  }
}
