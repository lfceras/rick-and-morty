const {catchedAsync} = require('../../utils')

module.exports = {
  getAllEpisodes: catchedAsync(require('./getAllEpisodes')),
  getEpisodesById: catchedAsync(require('./getEpisodesById')),
}