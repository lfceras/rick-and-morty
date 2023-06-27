import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCharacters } from "../../redux/actions/actions";
import CreateCharacter from "../createCharacter/CreateCharacter";
import SearchBar from "../searchbar/SearchBar";
import "./navBar.css";
import { RiArrowGoBackLine } from "react-icons/ri";
import image from '../../assets/rick1-removebg-preview.png'

const NavBar = () => {
  const dispatch = useDispatch();

  const reload = () => {
    dispatch(getAllCharacters());
  };

  return (
    <div className="principal">
      <header>
        <div className="enlaces">
        <Link to={'/home'} onClick={reload}>
            <img src={image} alt="Not Found" />
          </Link>
          <Link to={"/"}>
            <button>
              <RiArrowGoBackLine />
            </button>
          </Link>
        </div>

        <div className="links">
          <Link to={"/home"} className="link" >
            Home
          </Link>
          <Link to={"/create"} className="link">
            <CreateCharacter />
          </Link>
          <Link to={"/favorites"} className="link">
            Favorites
          </Link>
          <div>
            <SearchBar />
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
