import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCharacters } from "../../redux/actions/actions";
import CreateCharacter from "../createCharacter/CreateCharacter";
import SearchBar from "../searchbar/SearchBar";
import "./navBar.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import image from "../../assets/rick1-removebg-preview.png";

const NavBar = () => {
  const dispatch = useDispatch();

  const reload = () => {
    dispatch(getAllCharacters());
  };

  const currentPath = window.location.pathname;

  const shouldShowSearchBar =
    currentPath !== "/create" && currentPath !== "/favorites";

  const shouldAplyStyles = currentPath === "/create" || currentPath === "/favorites"

  return (
    <div className={`principal${shouldAplyStyles ? "additional-styles" : ""}`}>
      <header>
        <div className={`enlaces${shouldAplyStyles ? "additional-styles" : ""}`}>
          <Link to={"/home"} onClick={reload}>
            <img src={image} alt="Not Found" />
          </Link>
          {currentPath !== "/create" && (
            <Link to={"/"}>
              <button>
                <RiArrowGoBackLine />
              </button>
            </Link>
          )}
        </div>
        <div className={`links${shouldAplyStyles ? "additional-styles" : "" }`}>
          <Link to={"/home"} className={`link${currentPath === "/home" ? "active" : "" }`}>
            Home
          </Link>
          {currentPath !== "/create" && (
            <Link to={"/create"} className={`link${currentPath === "/create" ? "active" : "" }`}>
              Create Character
            </Link>
          )}
          {currentPath !== "/favorites" && (
            <Link to={"/favorites"} className={`link${currentPath === "/favorites" ? "active" : "" }`}>
              Favorites
            </Link>
          )}
          {shouldShowSearchBar && (
            <div>
              <SearchBar />
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default NavBar;
