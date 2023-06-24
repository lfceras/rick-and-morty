const { Episode } = require("../../src/db");
const { loadEpisode } = require("../../helpers/EpisodeController");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { id } = req.params;
  await loadEpisode();
  const allEpisodes = await Episode.findAll();
  if (id) {
    const idEpisode = allEpisodes.filter((el) => el.id == id);
    return idEpisode.length
      ? response(res, 200, idEpisode)
      : response(res, 404, { msg: "No existe este ID" });
  }
};
