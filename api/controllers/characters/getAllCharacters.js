// const { mergeDB } = require("../../helpers/CharacterController");
// const { response } = require("../../utils");

// module.exports = async (req, res) => {
//   const { name, species, status, origin, gender, location } = req.query;
//   const test = await mergeDB();
//   if (name) {
//     const filtro = test.filter((el) =>
//       el?.name.toLowerCase().includes(name.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   if (species) {
//     const filtro = test.filter((el) =>
//       el?.species.toLowerCase().includes(species.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   if (status) {
//     const filtro = test.filter((el) =>
//       el?.status.toLowerCase().includes(status.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   if (origin) {
//     const filtro = test.filter((el) =>
//       el?.origin.toLowerCase().includes(origin.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   if (gender) {
//     const filtro = test.filter((el) =>
//       el?.gender.toLowerCase().includes(gender.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   if (location) {
//     const filtro = test.filter((el) =>
//       el?.location.toLowerCase().includes(location.toLowerCase())
//     );
//     return filtro.length
//       ? response(res, 200, filtro)
//       : response(res, 404, { msg: "Not Found" });
//   }

//   return response(res, 200, test);
// };

const { mergeDB } = require("../../helpers/CharacterController");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, species, status, origin, gender, location } = req.query;
  const test = await mergeDB();
  let filteredData = test;

  if (name) {
    filteredData = filteredData.filter((el) =>
      el?.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (species) {
    filteredData = filteredData.filter((el) =>
      el?.species.toLowerCase().includes(species.toLowerCase())
    );
  }

  if (status) {
    filteredData = filteredData.filter((el) =>
      el?.status.toLowerCase().includes(status.toLowerCase())
    );
  }

  if (origin) {
    filteredData = filteredData.filter((el) =>
      el?.origin.toLowerCase().includes(origin.toLowerCase())
    );
  }

  if (gender) {
    filteredData = filteredData.filter((el) =>
      el?.gender.toLowerCase().includes(gender.toLowerCase())
    );
  }

  if (location) {
    filteredData = filteredData.filter((el) =>
      el?.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  return filteredData.length
    ? response(res, 200, filteredData)
    : response(res, 404, { msg: "Not Found" });
};
