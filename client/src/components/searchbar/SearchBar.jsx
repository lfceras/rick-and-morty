import React, { useState } from "react";
import "./searchBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";
import { useCallback } from "react";

const SearchBar = () => {
  const [character, setCharacter] = useState("");

  const dispatch = useDispatch()

  const handleChange = useCallback((e) => {
    let valor = e.target.value
    if(!valor.startsWith(" ")){
      setCharacter(valor)
    }
  },[])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!character.length){
        return alert("Debes ingresar un nombre");
      } else{
        dispatch(getByName(character))
        setCharacter("")
      }
    },[character, dispatch]) 

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
                <BiSearchAlt2/>
              </IconContext.Provider>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
