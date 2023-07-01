const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "character",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      species: {
        type: DataTypes.ENUM(
          "Human",
          "Alien",
          "Humanoid",
          "unknown",
          "Poopybutthole",
          "Mythological Creature",
          "Animal",
          "Robot",
          "Cronenberg",
          "Disease"
        ),
      },
      status: {
        type: DataTypes.ENUM("Alive", "unknown", "Dead"),
      },
      origin: {
        type: DataTypes.ENUM(
          "Earth (C-137)",
          "unknown",
          "Earth (Replacement Dimension)",
          "Abadango",
          "Signus 5 Expanse",
          "Post-Apocalyptic Earth",
          "Purge Planet",
          "Venzenulon 7",
          "Bepis 9",
          "Earth (C-500A)",
          "Earth (Evil Rick's Target Dimension)",
          "Nuptia 4",
          "Fantasy World",
          "Bird World",
          "Gromflom Prime",
          "Rick's Battery Microverse",
          "The Menagerie",
          "Earth (K-83)",
          "Hideout Planet",
          "Cronenberg Earth",
          "Giant's Town",
          "Unity's Planet",
          "Anatomy Park",
          "Earth (J19ζ7)",
          "Roy: A Life Well Lived",
          "Eric Stoltz Mask Earth",
          "Glaagablaaga",
          "Gazorpazorp",
          "Resort Planet",
          "Hamster in Butt World",
          "Earth (Giant Telepathic Spiders Dimension)",
          "Alphabetrium",
          "Earth (5-126)",
          "Krootabulon",
          "Pluto",
          "Zeep Xanflorp's Miniverse",
          "Larva Alien's Planet"
        ),
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "unknown"),
      },
      location: {
        type: DataTypes.ENUM(
          "Citadel of Ricks",
          "Earth (Replacement Dimension)",
          "Anatomy Park",
          "Earth (C-137)",
          "Rick's Memories",
          "Fantasy World"
        ),
      },
      image: {
        type: DataTypes.STRING,
      },
      create: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
