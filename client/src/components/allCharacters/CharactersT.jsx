import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCharacters, getByName } from "../../redux/actions/actions";
import CardCharacter from "../cardCharacter/CardCharacter";
import NavBar from "../navBar/NavBar";
import Paginado from "../paginado/Paginado";
import './characters.css'

const CharactersT = () => {
  const characters = useSelector((state) => state.characters);
  const Characters2 = useSelector((state) => state.characters2);

  const pageNumberLimit = 5;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setCharactersPerPage] = useState(4);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if(characters.length === Characters2.length){
      dispatch(getAllCharacters());
      dispatch(getByName())
    }
  }, [characters.length, Characters2.length, dispatch]);

  return (
    <div>
      <NavBar />
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
