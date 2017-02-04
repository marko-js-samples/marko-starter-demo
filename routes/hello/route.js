const template = require('./index.marko');

exports.handler = (input, out) => {
  // delegate rendering to the template
  template.render(input, out);

  // This will also work:
  // out.end('TEST')
};
