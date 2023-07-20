import CardCharacter from "../cardCharacter/CardCharacter";
import NavBar from "../navBar/NavBar";
import Paginado from "../paginado/Paginado";
import "./characters.css";
import { useCharacter } from "../../hooks/useCharacter";
import SpinnerLoading from "../spinnerLoading/SpinnerLoading";
import { useEffect } from "react";

const CharactersT = () => {
  const {
    characters,
    currentCharacters,
    charactersPerPage,
    paginado,
    currentPage,
    maxPageLimit,
    minPageLimit,
    onPrevClick,
    onNextClick,
    pageNumberLimit,
    loading,
  } = useCharacter();

  useEffect(() => {
    document.title = "Home";
  }, []);
  
  return (
    <div>
      <NavBar />
      <div className="offWindow">
        <div className="charcters">
          {loading ? (
            <SpinnerLoading/>
          ) : (
              currentCharacters && currentCharacters?.map((el) => ( 
              <CardCharacter
                key={el.id}
                id={el?.id}
                image={el?.image}
                name={el?.name}
                species={el?.species}
                origin={el?.origin}
                create={el.create}
              />
            ))
          )
          }
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
