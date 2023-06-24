const { mergeDB } = require("../../helpers/CharacterController");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name } = req.query;
  const test = await mergeDB();
  if (name) {
    const filtro = test.filter((el) =>
      el?.name.toLowerCase().includes(name.toLowerCase())
    );
    return filtro.length
      ? response(res, 200, filtro)
      : response(res, 404, { msg: "Not Found" });
  }
  return response(res, 200, test);
};
