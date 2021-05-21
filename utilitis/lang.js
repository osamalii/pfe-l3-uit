const fs = require("fs");




module.exports = (lang, type) => {
    let path = 'languages/' + lang + '.json';

    if( type !== 'home') path = 'languages/' + type + '/' + lang + '.json';
    const json = JSON.parse(fs.readFileSync(path));

    return json;
};
