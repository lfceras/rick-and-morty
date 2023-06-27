// const axios = require("axios");
const { Character, Episode } = require("../src/db.js");
const character = require("./characters.json");

const allData = async () => {
  try {
    // const datos = [];

    // for (let i = 1; i <= 10; i++) {
    //   datos.push(`https://rickandmortyapi.com/api/character?page=${i}`);
    // }
    // const datos2 = await Promise.all(datos.map((dato) => axios.get(dato)));
    // const characters2 = datos2.flatMap((el) => el.data.results);

    const characters2 = character.data;
    // console.log(characters2);
    const info = characters2.map((el) => {
      return {
        id: el.id,
        name: el.name,
        species: el.species,
        status: el.status,
        origin: el.origin?.name,
        gender: el.gender,
        location: el.location?.name,
        image: el.image,
        episodes: el.episode,
      };
    });
    return info;
  } catch (error) {
    console.error("MuESTRAME EL PUTO ERROR", error);
  }
};

// allData()
//   .then((info) => info)
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// const allData = async () => {
//   try {
//     const characterPages = [];

//     for (let i = 1; i <= 15; i++) {
//       characterPages.push(`https://rickandmortyapi.com/api/character?page=${i}`);
//     }

//     const characterResponses = await Promise.all(
//       characterPages.map((page) => axios.get(page, { timeout: 8000 }))
//     );

//     const characters = characterResponses.flatMap((response) => response.data.results);

//     const episodePromises = characters.map(async (character) => {
//       const episodeNames = await Promise.all(
//         character.episode.map(async (episodeUrl) => {
//           const episodeResponse = await axios.get(episodeUrl, { timeout: 8000 });
//           return episodeResponse.data.name;
//         })
//       );

//       return { characterId: character.id, episodeNames };
//     });

//     const episodesByCharacter = Object.fromEntries(
//       (await Promise.all(episodePromises)).map(({ characterId, episodeNames }) => [
//         characterId,
//         episodeNames,
//       ])
//     );

//     const info = characters.map((character) => ({
//       id: character.id,
//       name: character.name,
//       species: character.species,
//       status: character.status,
//       origin: character.origin?.name,
//       gender: character.gender,
//       location: character.location?.name,
//       image: character.image,
//       episode: episodesByCharacter[character.id],
//     }));

//     return info;
//   } catch (error) {
//     console.error("MuESTRAME EL PUTO ERROR", error);
//   }
// };

// allData()
//   .then((info) => info)
//   .catch((error) => {
//     console.error("Error:", error);
//   });

const myDataBase = async () => {
  return await Character.findAll({
    include: {
      model: Episode,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

const mergeDB = async () => {
  const data1 = await allData();
  const data2 = await myDataBase();
  if (!data1 || !data2) {
    throw new Error("data1 or data2 is undefined");
  }
  const data = data1.concat(data2);
  return data;
};

module.exports = {
  mergeDB,
};
