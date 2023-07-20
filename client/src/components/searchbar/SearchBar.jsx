import React, { useState, useEffect, useRef } from "react";
import "./searchBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { getAllCharacters } from "../../redux/actions/actions";
import { useCallback } from "react";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [character, setCharacter] = useState("");
  const [lastSearchedCharacter, setLastSearchedCharacter] = useState("");
  const dispatch = useDispatch();

  const handleChange = useCallback((e) => {
    let valor = e.target.value;
    if (!valor.startsWith(" ")) {
      setCharacter(valor);
    }
  }, []);

  // const debounceSearch = useRef(
  //   debounce((value) => {
  //     if (value.length) {
  //       dispatch(getByName(value));
  //       setLastSearchedCharacter(value);
  //     } else if (!value.length && lastSearchedCharacter.length) {
  //       dispatch(getAllCharacters());
  //       setLastSearchedCharacter("");
  //     }
  //   }, 200)
  // ).current;

  // useEffect(() => {
  //   if(character !== lastSearchedCharacter){
  //     debounceSearch(character);
  //   }
  // }, [character, debounceSearch, dispatch, lastSearchedCharacter, lastSearchedCharacter]);

  // const handleSubmit = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     if (!character.length) {
  //       dispatch(getAllCharacters());
  //     } else {
  //       dispatch(getByName(character));
  //     }
  //     // setCharacter("");
  //   },
  //   [character, dispatch]
  // );

  const debounceSearch = useRef(
    debounce((value) => {
      dispatch(getAllCharacters(value));
      setLastSearchedCharacter(value);
    }, 400)
  ).current;

  useEffect(() => {
    if (character !== lastSearchedCharacter) {
      debounceSearch(character);
    }
  }, [character, debounceSearch, dispatch, lastSearchedCharacter]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (character.length) {
        dispatch(getAllCharacters(character));
      }
    },
    [character, dispatch]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search">
          <div className="test">
            <input
              type="text"
              name="principal"
              placeholder="Ingresa el nombre"
              onChange={handleChange}
              value={character}
            />
            <div className="icon">
              <IconContext.Provider value={{ size: "20px" }}>
                <BiSearchAlt2 />
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
