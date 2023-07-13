const { Character, Episode } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, species, status, origin, gender, location, image, episodes } =
    req.body;
  const { id } = req.params;
  let updateEpisode = await Character.update(
    { name, species, status, origin, gender, location, image },
    {
      where: {
        id: id,
      },
    }
  );

  // let episodeId = await Episode.findAll({
  //   where: {
  //     name: episodes,
  //   },
  // });

  // const episode = await Character.findByPk(id);
  // episode.setEpisodes(episodeId);

  // if (updateEpisode[0] === 0) {
  //   return response(res, 404, { msg: "Episode not found" });
  // }

  return response(res, 200, { msg: "OK" });
};
