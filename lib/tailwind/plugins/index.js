const plugin = require('tailwindcss/plugin');
const components = require('./components');

const projectPlugin = plugin(function ({ addComponents }) {
  addComponents(components.components);
});

module.exports = projectPlugin;