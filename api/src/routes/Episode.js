const { Router } = require("express");
const episode = require('../../controllers/episodes')

const router = Router();

// Episodes
router.get('/', episode.getAllEpisodes)
router.get('/:id', episode.getEpisodesById)


module.exports = router;

