import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllCharacters, setCurrentPage } from "../../redux/actions/actions";
import CardCharacter from "../cardCharacter/CardCharacter";
import NavBar from "../navBar/NavBar";
import Paginado from "../paginado/Paginado";
import "./characters.css";
import { useCallback } from "react";

const CharactersT = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters, shallowEqual);
  const currentPage = useSelector(state => state.currentPage);
  // const Characters2 = useSelector((state) => state.characters2);

  const pageNumberLimit = 5;
  const [charactersPerPage] = useState(20);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = useMemo(
    () => characters.slice(indexOfFirstCharacter, indexOfLastCharacter),
    [characters, indexOfFirstCharacter, indexOfLastCharacter]
  );

  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const paginado = useCallback((pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  },[dispatch])

  const onPrevClick = useCallback(() => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    dispatch(setCurrentPage(currentPage - 1))
  },[currentPage, pageNumberLimit, dispatch])

  const onNextClick = useCallback( () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    dispatch(setCurrentPage(currentPage + 1))
  },[currentPage, maxPageLimit, pageNumberLimit, dispatch])


  useEffect(() => {
    if (characters.length === 0) {
      dispatch(getAllCharacters());
    }
  }, [characters.length, dispatch]);

  return (
    <div>
      <NavBar />
      <div className="offWindow">
      <div className="charcters">
        {currentCharacters?.map((el) => (
          <CardCharacter
            key={el.id}
            id={el.id}
            image={el.image}
            name={el.name}
            species={el.species}
            origin={el.origin}
          />
        ))}
      </div>
      </div>
      <Paginado
        charactersPerPage={charactersPerPage}
        characters={characters.length}
        paginado={paginado}
        currentPage={currentPage}
        maxPageLimit={maxPageLimit}
        minPageLimit={minPageLimit}
        onPrevClick={onPrevClick}
        onNextClick={onNextClick}
        pageNumberLimit={pageNumberLimit}
      />
    </div>
  );
};

export default CharactersT;
