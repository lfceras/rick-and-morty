const {catchedAsync} = require('../../utils')

module.exports = {
  getAllCharacters: catchedAsync(require('./getAllCharacters')),
  getCharactersById: catchedAsync(require('./getCharactersById')),
  updateCharacter: catchedAsync(require('./updateCharacter')),
  deleteCharacters: catchedAsync(require('./deleteCharacters')),
  addCharacters: catchedAsync(require('./addCharacters')),
}