import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addFavorite, deleteCharacter } from "../../redux/actions/actions";
import "./cardCharacter.css";
import { BsFillHeartFill } from "react-icons/bs";
import { RiArrowUpDoubleLine } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import { useCallback } from "react";

const CardCharacter = ({ id, image, name, species, origin, create }) => {
  const dispatch = useDispatch();

  const favorite = useSelector((state) => state.favorite);

  const addFavorites = useCallback(() => {
    const character = { id, image, name, species, origin };
    if (favorite.length >= 8) {
      alert("No pueden agregar mas personajes");
    }
    dispatch(addFavorite(character));
  }, [dispatch, id, image, name, species, origin]);

  const handleDelete = async () => {
    await dispatch(deleteCharacter(id));
  };

  return (
    <div className="cards">
      <div className="flit-card-inner">
        <div className="flit-card-front">
          <img src={image} alt={image} />
        </div>
        <div className="flit-card-back">
          <BsFillHeartFill className="hearts" onClick={() => addFavorites()} />

          {create && (
            <>
              <Link to={`/update/${id}`}>
                <button className="update">Update | <RiArrowUpDoubleLine 
                  style={{
                    marginBottom: -4
                  }}
                  size={19}
                /></button>
              </Link>
              <button className="delete" onClick={handleDelete}>
                Delete | <VscChromeClose
                 style={{
                  marginBottom: -4
                }}
                size={19}
                />
              </button>
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
