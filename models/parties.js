'use strict'
const {
    Model, STRING
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class parties extends Model{
        static associate(models){
            // associate!!
        }
    }
    parties.init({
        userId: DataTypes.STRING,
        pokemon: DataTypes.OBJECT
    },{
        sequelize, 
        modelName: 'parties'
    })
    return parties
}

// user id  

// pokemon: object from api 
// turn from JSON to object