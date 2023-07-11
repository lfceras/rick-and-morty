import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addFavorite,
  deleteCharacter,
  getDetails,
} from "../../redux/actions/actions";
import "./cardCharacter.css";
import { BsFillHeartFill } from "react-icons/bs";
import { useState } from "react";
import ModalDetails from "../modalDetalles/ModalDetails";

const CardCharacter = ({ id, image, name, species, origin, create }) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  const detalles = useSelector((state) => state.detalles);

  useEffect(() => {
    dispatch(getDetails(id));
  }, [id]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const addFavorites = () => {
    dispatch(addFavorite({ id, image, name, species, origin }));
    alert("Agregado a favoritos");
  };

  const handleDelete = async () => {
    await dispatch(deleteCharacter(id));
  };

  return (
    <div className="cards">
      <div className="flit-card-inner">
        <div className="flit-card-front">
          <img src={image} alt={image} />
          {/* <button onClick={openModal}>Detalles</button>
          <ModalDetails
            open={openModal}
            onClose={closeModal}
            detalles={detalles}
          /> */}
        </div>
        <div className="flit-card-back">
          <button onClick={() => addFavorites()}>
            <BsFillHeartFill className="hearts" />
          </button>
          {create && (
            <>
              <Link to={`/update/${id}`}>
                <button>Update</button>
              </Link>
              <button onClick={handleDelete}>Delete</button>
            </>
          )}
          <Link to={`/details/${id}`} className="link2">
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
