const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
  sequelize.define('episode', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    personajes: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Esto permite almacenar un array de strings
    }
  },{
    timestamps:false
 })
}