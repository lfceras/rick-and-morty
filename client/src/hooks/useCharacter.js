import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getAllCharacters, setCurrentPage } from "../../src/redux/actions/actions";
import { useCallback } from "react";


export function useCharacter(){
  const dispatch = useDispatch();
  const characters = useSelector((state) => state.characters, shallowEqual);
  const currentPage = useSelector(state => state.currentPage);
  // console.log(currentPage);

  const pageNumberLimit = 5;
  const charactersPerPage =12
  const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
  const [minPageLimit, setMinPageLimit] = useState(0)
  const [loading, setLoading] = useState(false) 
  const [isUnmounted, setIsUnmounted] = useState(false);   

  const currentCharacters = useMemo(() => {
    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    return characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  }, [characters, currentPage, charactersPerPage]);
  
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
    if (characters.length === 0 && !loading) {
      setLoading(true)
      dispatch(getAllCharacters()).then(()=>{
      setLoading(false)
      })
    }
  }, [characters.length, dispatch, loading]); 


  // useEffect(()=>{
  //   return ()=>{
  //     setIsUnmounted(false)
  //   }
  // },[])

  // useEffect(() => {
  //   return () => {
  //     dispatch(setCurrentPage(currentPage)); // Restablecer currentPage a la página actual al desmontar el componente
  //   };
  // }, [currentPage, dispatch]);

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