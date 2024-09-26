const fs = require('fs');
const { writeFile, readFile } = require('fs');


// Blocks the event loop
const path = "./Joe.json";
const joe = JSON.parse(fs.readFileSync(path));

exports.add = function add(lang, levelArg = null){
    joe.languages.push({title:lang, level: levelArg});

    writeFile(path, JSON.stringify(joe, null, 2), (err) => {
        this.list();
    });
}
exports.remove = function remove(lang){
    index = joe.languages.indexOf({title:lang});
    joe.languages.splice(index,1);
    
    writeFile(path, JSON.stringify(joe, null, 2), (err) => {
        this.list();
    });
}
exports.list = function list(){
    console.log(joe.languages);
}
exports.read = function read(lang){
    joe.languages.forEach(element => {
          if(element.title == lang){
            console.log(element);
          }  
    });
}


