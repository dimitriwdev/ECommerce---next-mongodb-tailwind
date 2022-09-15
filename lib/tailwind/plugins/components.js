const { theme } = require('../preset');

module.exports = {
  components: {
    '.title': {
      color: `${theme.colors.black}`,
      transition: 'all 0.2s ease-in-out',
      '&:hover': {
        backgroundColor: `${theme.colors.grey.dark}`,
        color: `${theme.colors.white}`,
      },
    },
  },
};