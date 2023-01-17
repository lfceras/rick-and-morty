import React from "react";
import { Link } from "react-router-dom";
import "./cardCharacter.css";

const CardCharacter = ({ id, image, name, species, origin }) => {
  return (
    <div className="cards">
      <div className="flit-card-inner">
          <div className="flit-card-front">
            <img src={image} alt={image} />
          </div>
          <div className="flit-card-back">
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
