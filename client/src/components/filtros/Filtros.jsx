import React, { useState } from "react";
import "./filtros.css";
import { useDispatch } from "react-redux";
import {
  filterByGender,
  filterByLocation,
  filterBySpecies,
  filterByStatus,
  filterCreated,
  orderByName,
} from "../../redux/actions/actions";

const Filtros = () => {
  const dispatch = useDispatch();
  const [orden, setOrden] = useState("");

  const handleSort = (e) => {
    dispatch(orderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFiterStatus = (e) => {
    dispatch(filterByStatus(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFilterGender = (e) => {
    dispatch(filterByGender(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFilterSpecies = (e) => {
    dispatch(filterBySpecies(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFilterLocation = (e) => {
    dispatch(filterByLocation(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  const handleFilterCreated = (e) => {
    dispatch(filterCreated(e.target.value));
    setOrden(`Ordenado ${e.target.value}}`);
  };

  return (
    <div>
      <div className="contenedor-principalF">
        <div className="contenedor-principalE">
          <div className="inputSort">
            <label htmlFor="">Ordenar por</label>
            <input type="submit" value="ASC" onClick={(e) => handleSort(e)} />
            <input type="submit" value="DESC" onClick={(e) => handleSort(e)} />
          </div>

          <div className="buttonFilter">
            <label htmlFor="">Filtrar de</label>
            <input
              type="submit"
              value="created"
              onClick={handleFilterCreated}
            />

            <input
              type="submit"
              value="all"
              onClick={handleFilterCreated}
              className="right"
            />
          </div>

          <div className="selectFilter">
            {/* ESPECIES */}
            <label htmlFor="">Especie</label>
            <select onChange={handleFilterSpecies}>
              <option value="all">Todos</option>
              <option value="Human">Human</option>
              <option value="Alien">Alien</option>
              <option value="Humanoid">Humanoid</option>
              <option value="unknown">unknown</option>
              <option value="Poopybutthole">Poopybutthole</option>
              <option value="Mythological Creature">
                Mythological Creature
              </option>
              <option value="Animal">Animal</option>
              <option value="RobotCronenberg">RobotCronenberg</option>
              <option value="Cronenberg">Cronenberg</option>
              <option value="Disease">Disease</option>
            </select>

            {/* GENERO */}
            <label htmlFor="">Genero</label>
            <select onChange={handleFilterGender}>
              <option value="all">Todos</option>
              <option value="Male">Hombre</option>
              <option value="Female">Mujer</option>
              <option value="unknown">Desconocido</option>
            </select>

            {/* LOCATION */}
            <label htmlFor="">Locacion</label>
            <select onChange={handleFilterLocation}>
              <option value="all">Todos</option>
              <option value="Citadel of Ricks">Citadel of Ricks</option>
              <option value="Earth (Replacement Dimension)">
                Earth (Replacement Dimension)
              </option>
              <option value="Anatomy Park">Anatomy Park</option>
              <option value="Earth (C-137)">Earth (C-137)</option>
              <option value="Rick's Memories">Rick's Memories</option>
              <option value="Fantasy World">Fantasy World</option>
            </select>

            {/* STATUS */}
            <label htmlFor="">Status</label>
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

export default Filtros;
