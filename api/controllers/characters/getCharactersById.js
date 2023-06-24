const { mergeDB } = require("../../helpers/CharacterController");
const { response } = require("../../utils");

module.exports = async (req, res) => { 
  const { id } = req.params;
  const test = await mergeDB();
  if (id) {
    const idFilter = test.filter((el) => el?.id == id);
    return idFilter.length
      ? response(res, 200, idFilter)
      : res.status(404).json({ message: "Character not found" });
  }
};
