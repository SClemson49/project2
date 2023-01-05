'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class parties extends Model{
        static associate(models){
            // associate!!
            this.belongsTo(models.user)
        }
    }
    parties.init({
        userId: DataTypes.STRING,
        // pokemon: DataTypes.OBJECT
    },{
        sequelize, 
        modelName: 'parties'
    })
    return parties
}

// user id  

// pokemon: object from api 
// turn from JSON to object