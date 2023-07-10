import React, { useEffect, useState } from "react";
import "./paginado.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByStatus,
  filterCreated,
  orderByName,
} from "../../redux/actions/actions";

const Paginado = ({
  charactersPerPage,
  characters,
  paginado,
  currentPage,
  maxPageLimit,
  minPageLimit,
  onPrevClick,
  onNextClick,
}) => {
  const [orden, setOrden] = useState("");
  const dispatch = useDispatch();

  let charactersExist = useSelector(state => state.charactersExist)

  // console.log(charactersExist);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(characters / charactersPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    onPrevClick();
  };

  const handleNextClick = () => {
    onNextClick();
  };

  const handlePageClick = (e) => {
    paginado(Number(e.target.id));
  };

  const pageCharacters = pageNumbers.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pageNumbers.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  const handleSort = (e) => {
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFiterStatus = (e) => {
    dispatch(filterByStatus(e.target.value));
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
  };

  return (
    <div>
      <div className="paginado">
        <div className="names">
          <div>
            <input type="submit" value="ASC" onClick={(e) => handleSort(e)} />
            <input type="submit" value="DESC" onClick={(e) => handleSort(e)} />
          </div>

          <ul>
            <li>
              <button
                className="btn"
                onClick={handlePrevClick}
                disabled={currentPage === pageNumbers[0]}
              >
                <FaChevronLeft />
              </button>
            </li>
            {/* {pageDecremenEllipses} */}
            {pageCharacters}
            {/* {pageIncrementEllipses} */}
            <li>
              <button
                className="btn"
                onClick={handleNextClick}
                disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
              >
                <FaChevronRight />
              </button>
            </li>
          </ul>

          <div>
            <button
              type="submit"
              value="created"
              onClick={handleFilterCreated}
              className="create"
              // disabled={!charactersExist}
            >
              <span>DB</span>
            </button>

            <button
              type="submit"
              value="all"
              onClick={handleFilterCreated}
              className="create"
            >
              <span>API</span>
            </button>

            <select onChange={handleFiterStatus}>
              <option value="all">Todos</option>
              <option value="Alive">Vivo</option>
              <option value="unknown">Desconocido</option>
              <option value="Dead">Muerto</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paginado;
