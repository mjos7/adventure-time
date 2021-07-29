module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

// ADD THIS AT END OF PROJECT
// const purge = process.eng.NODE_ENV === 'production' ? true : false;
// purge: { enabled: true, content: ['./build/**/*.html'] },
