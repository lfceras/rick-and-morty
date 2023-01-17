import React from "react";
import "./paginado.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  return (
    <div>
      <div className="paginado">
        <ul >
          <li>
            <button
              className="btn"
              onClick={handlePrevClick}
              disabled={currentPage === pageNumbers[0]}
            >
             <FaChevronLeft/>
            </button>
          </li>
          {pageDecremenEllipses}
          {pageCharacters}
          {pageIncrementEllipses}
          <li>
            <button
            className="btn"
              onClick={handleNextClick}
              disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
            >
              <FaChevronRight/>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Paginado;
