const _ = require('lodash');

// commando numero uno
// This command transorms an array into an array of chunks
const dude = _.chunk(["left leg", "right leg", "left arm","right arm","torso","head"], 2);
console.log("uno: ",dude);

// commando dos
// removes false, 0, null, undefined and NaN
const religion = _.compact(["god", 0, 0, 0, 0, 0, 0, 0, 0, "people"]);
console.log("dos: ", religion);

// commando tres
// returns an array of elements not present in a second array
let atheist = ["society", "justice", "existantial dread"];
let christian = ["god", "justice", "hope"];
let whitePeopleBeLike = _.difference(atheist, christian);
console.log("tres: ", whitePeopleBeLike);

// commando quadro
// "drops" left side of the array from the given index
let dreams = ["peace", "cycling travel", "self-actualisation"];
console.log("quadro: ", _.drop(dreams,2));

// commando cinco
// get the first element of an array
// Side note: why is this a thing? 
// why not just do array[0] ?
const rottenFish = ["State", "the people"];
console.log("cinco: ", _.head(rottenFish));