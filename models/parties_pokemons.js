'use strict'
const {
    Model, INTEGER
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class parties_pokemons extends Model{
        static associate(models){
            // associate!!

        }
    }
    parties_pokemons.init({
        partyId: DataTypes.STRING, //string?
        pokemonId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'parties_pokemons'
    })
    return parties_pokemons
}
// party ID

// pokemon ID