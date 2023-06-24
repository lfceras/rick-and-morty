const { Episode } = require("../../src/db");
const { loadEpisode } = require("../../helpers/EpisodeController");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name } = req.query;
  await loadEpisode();
  const allEpisodes = await Episode.findAll();

  if (name) {
    const allEpisodesFilter = allEpisodes.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    return allEpisodesFilter.length
      ? response(res, 200, allEpisodesFilter)
      : response(res, 404, { msg: "No episodes found" });
  }
  response(res, 200, allEpisodes);
};
