const { Character, Episode } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, species, status, gender, episodes, origin, location, image } =
    req.body;
 // Verificar si el personaje ya existe
 const existingCharacter = await Character.findOne({
  where: {
    name: name,
  },
});

if (existingCharacter) {
  return res.status(400).json({ error: 'El personaje ya existe' });
}

// Validar los datos de entrada
if (!name || name.length < 1 || name.length > 100) {
  return res.status(400).json({ error: 'El nombre es inválido' });
}

if (!['Alive', 'unknown', 'Dead'].includes(status)) {
  return res.status(400).json({ error: 'El estado es inválido' });
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
