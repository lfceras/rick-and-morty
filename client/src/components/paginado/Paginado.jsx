import "./paginado.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import { VscChromeClose, VscListFilter } from "react-icons/vsc";
import Filtros from "../filtros/Filtros";

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
  const [open, setOpen] = useState(false);

  const burgerIcon = (
    <VscListFilter
      style={{
        overflow: "visible",
        color: "white",
        fill: "white",
        marginBottom: -23,
        cursor: "pointer",
      }}
      size="25px"
      onClick={() => setOpen(!open)}
    />
  );

  const closeBurger = (
    <VscChromeClose
      style={{
        overflow: "visible",
        color: "white",
        fill: "white",
        marginBottom: -23,
        cursor: "pointer",
      }}
      size="25px"
      onClick={() => setOpen(!open)}
    />
  );

  const handleClickOutside = (event) => {
    if (!event.target.closest(".filtrers")) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

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

  // let pageIncrementEllipses = null;
  // if (pageNumbers.length > maxPageLimit) {
  //   pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  // }
  // let pageDecremenEllipses = null;
  // if (minPageLimit >= 1) {
  //   pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  // }

  return (
    <div>
      <div className="paginado">
        <div className="filtrers">
          {open ? closeBurger : burgerIcon}
          {open && <Filtros />}
        </div>
        <div className="numbers">
          <ul>
            <button
              className="btn"
              onClick={handlePrevClick}
              disabled={currentPage === pageNumbers[0]}
            >
              <FaChevronLeft />
            </button>
            {/* {pageDecremenEllipses} */}
            {pageCharacters}
            {/* {pageIncrementEllipses} */}
            <button
              className="btn"
              onClick={handleNextClick}
              disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
            >
              <FaChevronRight />
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Paginado;
