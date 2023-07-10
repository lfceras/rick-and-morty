import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { postCreate, getEpisodes } from "../../src/redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export function useSubmit() {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      species: "",
      status: "",
      gender: "",
      origin: "",
      location: "",
      image: "",
      episodes: [],
    },
    onSubmit: async (values, { resetForm }) => {
      await dispatch(postCreate(values));
      resetForm({ values: "" });
      navigate("/home");
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Nombre demasiaod corto")
        .max(20, "Te excediste en el numero de caracteres")
        .required("Este campo es obligatorio"),
      species: Yup.string().required("Debes seleccionar una especie"),
      status: Yup.string().required("Debes seleccionar un status"),
      gender: Yup.string().required("Debes seleccionar un genero"),
      origin: Yup.string().required("Debes seleccionar un planeta de origen"),
      location: Yup.string().required("Debes seleccionar una locacion"),
      image: Yup.string().required("Selecciona una imagen"),
      episodes: Yup.array().required("Selecciona al menos un episodio"),
    }),
  });

  useEffect(() => {
    dispatch(getEpisodes());
  }, [dispatch]);

  return {
    formik,
  };
}
