const template = require('./index.marko');

exports.path = '/hello/:name';

// The following is used when doing static builds
// to generate all pages for all enumerated params
exports.params = [
  { name: 'marko' },
  { name: 'world' }
];

exports.handler = (input, out) => {
  var name = input.params.name;

  // delegate rendering to the template
  template.render({
    name
  }, out);

  // This will also work:
  // out.end('<html>...</html>')
};
