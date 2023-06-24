const { Character } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, status, species, gender, image, episodes } = req.body;
  const { id } = req.params;
  await Character.update(
    { name, status, species, gender, image, episodes },
    {
      where: {
        id: id,
      },
    }
  );
  return response(res, 200, { msg: "OK" });
};
