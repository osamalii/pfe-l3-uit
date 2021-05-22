const fs = require("fs");

const pather = (lang, type) => 'languages/' + lang + '/' + type + '.json';

const jsoner = (lang, type) => {
    if(lang === '') return jsoner('en', type);
    return JSON.parse(fs.readFileSync(pather(lang,type)))
};

module.exports = jsoner;
