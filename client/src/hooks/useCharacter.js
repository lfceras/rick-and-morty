import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllCharacters, setCurrentPage } from "../../src/redux/actions/actions";
import { useCallback } from "react";


export function useCharacter(){
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters, shallowEqual);
  const currentPage = useSelector(state => state.currentPage);

  const pageNumberLimit = 5;
  const [charactersPerPage] = useState(12);   
  // const indexOfLastCharacter = currentPage * charactersPerPage;
  // const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;

  // const currentCharacters = useMemo(
  //   () => characters.slice(indexOfFirstCharacter, indexOfLastCharacter),
  //   [characters, indexOfFirstCharacter, indexOfLastCharacter]
  // );

  const currentCharacters = useMemo(() => {
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    return characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  }, [characters, currentPage, charactersPerPage]);
  
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      dispatch(getAllCharacters()).then(()=>{
      setLoading(false)
      })
    }
  }, [characters.length, dispatch]); 

  return{
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
    loading
  }
}