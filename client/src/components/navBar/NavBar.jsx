import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAllCharacters } from "../../redux/actions/actions";
import CreateCharacter from "../createCharacter/CreateCharacter";
import Favorites from "../favorites/Favorites";
import SearchBar from "../searchbar/SearchBar";
import "./navBar.css";
import { TfiReload } from "react-icons/tfi";
import { AiOutlineHome } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";
import { BsFillHeartFill } from "react-icons/bs";

const NavBar = () => {
  const dispatch = useDispatch();

  const reload = () => {
    dispatch(getAllCharacters());
  };

  return (
    <div className="principal">
      <header>
        <div className="enlaces">
          <Link to={"/"}>
            <button>
              <RiArrowGoBackLine/>
            </button>
          </Link>
          <Link to={"/home"}>
            <button>
              <AiOutlineHome />
            </button>
          </Link>
          <button onClick={() => reload()}>
            <TfiReload />
          </button>
        </div>
        
        <div className="links">
          <Link to={"/create"} className="link">
            <CreateCharacter />
          </Link>
          <Link to={"/favorites"} className="link">
            Favorites
            <BsFillHeartFill className="heart"/>
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
