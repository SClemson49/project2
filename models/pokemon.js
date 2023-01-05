'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class pokemon extends Model{
    static associate(models){
            this.hasMany(models.Pokemon)
        }
    }
    pokemon.init({
        name: DataTypes.STRING,
        type: DataTypes.OBJECT
    },{
        sequelize, 
        modelName: 'pokemon'
    })
    return pokemon
}

// pokemon name: string

// pokemon type: array of objects
// loop through types in case of multiples
/// types.type.name

// parties_pokemon is an embedded model that connects pokemons to parties


