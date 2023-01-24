import React, { useState } from "react";
import "./searchBar.css";
import { BiSearchAlt2 } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { useDispatch } from "react-redux";
import { getByName } from "../../redux/actions/actions";

const SearchBar = () => {
  const [character, setCharacter] = useState("");

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(e.target.value)) {
      alert("Solo se permimite ingresar letras");
    }
    setCharacter(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!character) return alert("Debes ingresar un nombre");
    else if (/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>\d/?~]/.test(character)) {
      alert("El nombre del personaje ingresado no existe");
    } else {
      dispatch(getByName(character))
      setCharacter("")
    }
  };

  return (
    <div>
        <div className="search">
          <div className="test">
            <input
              type="text"
              placeholder="Ingresa el nombre"
              onChange={handleChange}
              value={character}
            />
            <div className="icon">
              <IconContext.Provider value={{ size: "35px" }}>
                <BiSearchAlt2 onClick={(e)=>handleSubmit(e)} />
              </IconContext.Provider>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SearchBar;
