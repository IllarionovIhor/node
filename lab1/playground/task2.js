const fs = require('node:fs');

const content = '\nHello World!';

fs.appendFile('C:\\Users\\user\\Desktop\\nodejs\\lab1\\benis.txt', content, err => {
    if (err) {
        console.error(err);
    } else {
        // done!
    }
});