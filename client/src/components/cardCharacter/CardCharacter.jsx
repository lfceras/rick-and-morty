import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite } from "../../redux/actions/actions";
import "./cardCharacter.css";
import { BsFillHeartFill } from "react-icons/bs";

const CardCharacter = ({ id, image, name, species, origin }) => {

  const dispatch = useDispatch()

  const addFavorites = ()=>{
    dispatch(addFavorite({ id, image, name, species, origin}))
  }

  return (
    <div className="cards">
      <div className="flit-card-inner">
          <div className="flit-card-front">
            <img src={image} alt={image} />
          </div>
          <div className="flit-card-back">
            <button onClick={()=>addFavorites()}>
            <BsFillHeartFill className="hearts"/>
            </button>
            <Link to={`/details/${id}`} className='link2'>
                <img src={image} alt={image} />
                <label className="letters">{name}</label>
            </Link>
          <span className="letters">{species}</span>
          <span className="letters">{origin}</span>
          </div>
      </div>
    </div>
  );
};

export default CardCharacter;
