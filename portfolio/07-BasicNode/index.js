//Hello world
console.log("¡Hello world!");

//require tool
const sw = require('star-wars-quotes')
console.log(sw())

//Multiple calls
const superheroes = require('superheroes');
const supervillains = require('supervillains');

const hero = superheroes.randomSuperhero();
const villain = supervillains.randomSupervillain();

console.log(`${hero} is fighting ${villain} in an epic battle!`);

//Read file
const fs = require('fs');
const content = fs.readFileSync('data/input.txt', 'utf-8');
console.log(content);