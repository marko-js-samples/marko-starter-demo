const fs = require('fs');
const path = require('path');
const http = require('http');
const open = require('open-in-editor');
const editor = open.configure({ editor:'atom' }, (err) => console.error(err));

const PORT = 53098;

http.createServer((req, res) => {
    let file = path.resolve(process.cwd(), req.url.slice(1));
    console.log('OPENING', file);
    editor.open(file).catch((err) => console.error(err));
}).listen(PORT);

module.exports = function(el, context) {
    let src = el.getAttributeValue('src');

    if (!src) {
        return context.error('<sourcelink> requires a src attribute: the relative path from the template to the file you wish to link to.');
    }

    if (!src.type === 'Literal' && typeof src.value !== 'string') {
        return context.error('<sourcelink> the src attribute must be a string literal value: the relative path from the template to the file you wish to link to.');
    }

    let absolutePath = path.resolve(context.dirname, src.value);
    let pathParts = absolutePath.split(':');
    let file = pathParts[0];
    let line = pathParts[1];
    let column = pathParts[2];

    if (!fs.existsSync(file)) {
        return context.error('<sourcelink> the resolved src does not exist: '+file);
    }

    el.setAttributeValue('src', path.relative(process.cwd(), absolutePath));
    el.setAttributeValue('port', PORT.toString());
}