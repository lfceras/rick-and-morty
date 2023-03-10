import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavorite } from "../../redux/actions/actions";
import NavBar from "../navBar/NavBar";
import './favorite.css'
import { TiDeleteOutline } from "react-icons/ti";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorite);
  // console.log(favorites);

  const dispatch = useDispatch()

  const deleteFav = (id)=>{
    dispatch(deleteFavorite(id))
  }

  return (
    <div>
      <NavBar/>
      <div className="principal-container">
      {favorites?.map((el) => (
        <div key={el.id}>
          <div className="card">
          
            <div className="flit-card-inner1">
              <div className="flit-card-front1">
                <img src={el.image} alt={el.image} />
              </div>
              <div className="flit-card-back1">
              <button onClick={()=> deleteFav(el.id)}>
                <TiDeleteOutline className="delete"/>
              </button>
                <img src={el.image} alt={el.image} />
                <label className="letters1">{el.name}</label>
                <span className="letters1">{el.species}</span>
                <span className="letters1">{el.origin}</span>
              </div>
            </div>
          </div>
          </div>
      ))}
      </div>
    </div>
  );
};

export default Favorites;
