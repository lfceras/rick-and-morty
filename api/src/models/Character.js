const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
  sequelize.define('character', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,   
      primaryKey: true, 
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    species:{
      type: DataTypes.STRING,
    },
    status:{
      type: DataTypes.ENUM("Alive", "unknown", "Dead"),
    },
    origin:{
      type: DataTypes.STRING,
    },
    gender:{
      type: DataTypes.STRING,
    },
    location:{
      type: DataTypes.STRING, 
    },
    image:{
      type: DataTypes.STRING,
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    timestamps:false
 })
}