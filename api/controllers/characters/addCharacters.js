const { Character, Episode } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, species, status, gender, episodes, origin, location, image } =
    req.body;
  if (!name || !species || !status || !gender) {
    return response(res, 404, { msg: "Te falta llenar algunos campos" });
  }
  const createCharacter = await Character.create({
    name,
    species,
    status,
    origin, 
    gender,
    location,
    image,
  });
  const EpisodeDB = await Episode.findAll({
    where: {
      name: episodes,
    },
  });
  await createCharacter.addEpisode(EpisodeDB);
  return response(res, 200, { createCharacter });
};
