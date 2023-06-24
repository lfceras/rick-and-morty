const { Router } = require("express");
const router = Router();
const characters = require('../../controllers/characters')

// Characters
router.get('/', characters.getAllCharacters)
router.get('/:id', characters.getCharactersById)
router.put('/:id', characters.updateCharacter)
router.delete('/:id', characters.deleteCharacters)
router.post('/', characters.addCharacters)

module.exports = router;