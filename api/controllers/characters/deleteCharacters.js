const { Character } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { id } = req.params;
  // const {name} = req.body;
  await Character.destroy({
    where: {
      id: id,
    },
  });
  return response(res, 200, { msg: "Personaje eliminado" });
};
