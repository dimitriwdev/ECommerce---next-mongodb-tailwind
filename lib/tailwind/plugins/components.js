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
        color: `${theme.colors.primary}`,
      }
    },
    '.default-btn': {
      color: `${theme.colors.white}`,
      backgroundColor: `${theme.colors.grey.dark}`,
      border: `1px solid ${theme.colors.grey.dark}`,
      transition: 'all 0.2s ease-in-out',
      padding: '0.5rem 1rem',
      marginTop: '0.5rem',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: `${theme.colors.transparent}`,
        color: `${theme.colors.grey.dark}`,
      }
    },
    '.edit-btn': {
      color: `${theme.colors.grey.dark}`,
      backgroundColor: `${theme.colors.grey.medlight}`,
      border: `1px solid ${theme.colors.grey.medlight}`,
      transition: 'all 0.2s ease-in-out',
      padding: '0.5rem 1rem',
      marginTop: '0.5rem',
      marginLeft: '0.2rem',
      marginRight: '0.2rem',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: `${theme.colors.transparent}`,
        color: `${theme.colors.grey.dark}`,
      }
    },
    '.delete-btn': {
      color: `${theme.colors.grey.dark}`,
      backgroundColor: `${theme.colors.grey.medlight}`,
      border: `1px solid ${theme.colors.grey.medlight}`,
      transition: 'all 0.2s ease-in-out',
      padding: '0.5rem 1rem',
      marginTop: '0.5rem',
      marginLeft: '0.2rem',
      marginRight: '0.2rem',
      borderRadius: '5px',
      '&:hover': {
        backgroundColor: `${theme.colors.warning}`,
        border: `1px solid ${theme.colors.warning}`,
        color: `${theme.colors.white}`,
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
    },
    '.input': {
      width: '100%',
      marginTop: '0.5rem',
      border: `1px solid ${theme.colors.grey.dark}`,
      borderRadius: '5px',
      padding: '0.5rem',
    },
    '.toastSuccess': {
      backgroundColor: `${theme.colors.success}`
    },
    '.toastError': {
      backgroundColor: `${theme.colors.success}`
    },
  },
}