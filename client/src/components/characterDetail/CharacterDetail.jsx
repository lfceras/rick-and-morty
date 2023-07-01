import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetails, getDetails } from "../../redux/actions/actions";
import NavBar from "../navBar/NavBar";
import "./details.css";

const CharacterDetail = () => {
  const { id } = useParams();

  const detalles = useSelector((state) => state.detalles);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetails(id));
    return ()=>{dispatch(cleanDetails())}
  }, [id]);
  return (
    <div>
      <NavBar />
      <div className="back-n">
      <div className='principal-character'>
        
      <div className="principal2">
        <img src={detalles.image} alt={detalles.image} />
        <h1>{detalles.name}</h1>
          <h2>{detalles.species}</h2>
          <label>Genero</label>
          <span>{detalles.gender}</span>
          <label>Status</label>
          <span>{detalles.status}</span>
          <label>Origen</label>
          <span>{detalles.origin}</span>
          <label>Locacion</label>
          <span>{detalles.location}</span>
      </div>


      <div className='episodes'>
        <h2>Episodes</h2>
        <div className="epids">
          {
            detalles.episodes && detalles.episodes?.map((el, index) => (
              <ul key={index}>
                <li>{`${index + 1} - ${el.name ? el.name : el}`}</li>
              </ul>
            ))
          }
      </div>
        </div>
      </div>
    </div>
      </div>
  );
};

export default CharacterDetail;
