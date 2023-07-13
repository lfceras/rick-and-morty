import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getEpisodes, getDetails, updateCharacter } from "../../src/redux/actions/actions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useFormik} from 'formik'
import * as Yup from 'yup'

export function useUpdate() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const {id} = useParams()
  let details = useSelector(state => state.detalles)

  const formik = useFormik({
    initialValues:{
      name: "",
      species: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      episodes: [],
    },
    onSubmit:(values)=>{
      try {
         dispatch(updateCharacter(id, values));
        console.log("ID" ,id, "values" ,values);
        dispatch(getDetails(id));
        alert('Se actualizo el personaje')
        navigate('/home')
      } catch (error) {
        console.error("posibllemente aca", error)
      }
    }
  })

  useEffect(() => {
    dispatch(getEpisodes());
    if(id){
      dispatch(getDetails(id))
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (details && !formik.values.name) {
      const { name, species, status, gender, origin, location, image, episodes } = details;
      if (!Object.is(name, formik.values.name)
        || !Object.is(species, formik.values.species)
        || !Object.is(status, formik.values.status)
        || !Object.is(gender, formik.values.gender)
        || !Object.is(origin, formik.values.origin)
        || !Object.is(location, formik.values.location)
        || !Object.is(image, formik.values.image)
        || !Object.is(episodes, formik.values.episodes)
        // El método estático Object.is() determina si dos valores son el mismo valor.
      ) {
        formik.setValues({
          name,
          species,
          status,
          gender,
          origin,
          location,
          image,
          episodes,
        });
      }
    }
  }, [details, formik.values]);


  return {
    formik
  };
}
