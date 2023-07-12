import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanDetails, getDetails } from "../../redux/actions/actions";
import NavBar from "../navBar/NavBar";
import "./details.css";
import SpinnerDetail from "../spinnerLoading/SpinnerDetail";

const CharacterDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const detalles = useSelector((state) => state.detalles);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getDetails(id)).then(() => {
      setLoading(false);
    });
    return () => {
      dispatch(cleanDetails());
    };
  }, [id]);
  return (
    <div>
      <NavBar />
      {loading ? (
        <SpinnerDetail/>
        ) : (
        // <SpinnerDetail/>
        <div className="back-n">
          <div className="principal-character">
            <div className="principal2">
              <div className="image3">
              <img src={detalles.image} alt={detalles.image} />
              <span>{detalles.name}</span>
              </div>

              <div className="detalles1">
              <label>Species</label>
              <span>{detalles.species}</span>
              <label>Genero</label>
              <span>{detalles.gender}</span>
              </div>

              <div className="detalles2">
              <label>Status</label>
              <span>{detalles.status}</span>
              <label>Origen</label>
              <span>{detalles.origin}</span>
              </div>

              <div className="detalles3">
              <label>Locacion</label>
              <span>{detalles.location}</span>
              </div>
            </div>

            <div className="episodes2">
              <h2>Episodes</h2>
              <div className="epids2">
                {detalles.episodes &&
                  detalles.episodes?.map((el, index) => (
                    <ul key={index}>
                      <li>{`${index + 1} - ${el.name ? el.name : el}`}</li>
                    </ul>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default CharacterDetail;
