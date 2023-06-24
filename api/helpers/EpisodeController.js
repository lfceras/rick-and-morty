const axios = require("axios");
const { Episode } = require("../src/db.js");

const allData = async () => {
  try {
    const datos = [];
    for (let i = 1; i <= 3; i++) {
      datos.push(`https://rickandmortyapi.com/api/episode?page=${i}`);
    }
    const datos2 = await Promise.all(datos.map((dato) => axios.get(dato)));
    const episodes = datos2.flatMap((el) => el.data.results);

    const info = await Promise.all(
      episodes.map(async (el) => {
        const characterPromises = el.characters.map((characterUrl) =>
          axios.get(characterUrl)
        );
        const characterResponses = await Promise.all(characterPromises);
        const characterNames = characterResponses.map(
          (response) => response.data.name
        );

        return {
          id: el.id,
          name: el.name,
          personajes: characterNames,
        };
      })
    );
    return info;
  } catch (error) {
    console.error(error);
  }
};

const allDb = async () => {
  try {
    const episodess = await Episode.findAll();
    if (!episodess || !Array.isArray(episodess) || !episodess.length) {
      let data = await allData();
      await Episode.bulkCreate(data);
    }
  } catch (error) {
    console.error("Error loading episodes to DB:", error);
  }
};

const loadEpisode = async () => {
  await allDb();
};

loadEpisode();

module.exports = {
  loadEpisode,
};
