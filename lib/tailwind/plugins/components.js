const { theme } = require('../preset');

module.exports = {
  components: {
    '.primary-btn': {
      color: `${theme.colors.white}`,
      backgroundColor: `${theme.colors.primary}`,
      border: `1px solid ${theme.colors.primary}`,
      transition: 'all 0.2s ease-in-out',
      padding: '0.5rem 1rem',
      marginTop: '0.5rem',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: `${theme.colors.transparent}`,
        color: `${theme.colors.grey.dark}`,
      }
    },
    '.card': {
      marginBottom: '1rem',
      borderRadius: '5px',
      border: `1px solid ${theme.colors.grey.medlight}`,
      boxShadow: `5px 5px 6px -2px ${theme.colors.grey.medlight}`
    },
    '.text-link': {
      color: `${theme.colors.primary}`,
    },
    '.warning': {
      color: `${theme.colors.warning}`,
    }
  },
}