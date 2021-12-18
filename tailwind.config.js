const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./client/**/*.{html,js}', './public/**/*.{html,js}'],
  theme: {
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      barriecito: ['Barriecito', 'sans-serif'],
    },

    extend: {
      colors: {
        libiamYellow: {
          DEFAULT: '#F8CE46',
          bright: '#FFE14F',
          light: '#FAE5A1',
        },
      },
      width: {
        '25px': '25px',
        '50px': '50px',
      },
      height: {
        '25px': '25px',
        '50px': '50px',
        tall: '32rem',
      },
      minHeight: {
        96: '24rem',
      },
      minWidth: {
        80: '20rem',
      },
      outline: {
        yellow: '2px solid #FBBF5D',
        blue: '2px solid #3b82f6',
        0: '0px solid transparent',
        gray300: '2px solid #D1D5DB',
      },
      transitionProperty: {
        outline: 'outline',
      },
      boxShadow: {
        bookLeft: 'inset -8px 0 10px -6px rgba(0, 0, 0, 0.3)',
        bookRight: 'inset 8px 0 10px -6px rgba(0, 0, 0, 0.3)',
      },
    },
  },

  variants: {
    extend: {
      backgroundColor: ['label-checked', 'active', 'disabled'],
      scale: ['active'],
      transition: ['active'],
      transform: ['active'],
      outline: ['hover', 'focus', 'active', 'disabled'],
      textColor: ['label-checked', 'active', 'disabled'],
      cursor: ['disabled'],
    },
  },

  plugins: [
    plugin(({ addVariant, e }) => {
      addVariant('label-checked', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          const eClassName = e(`label-checked${separator}${className}`); // escape class
          const yourSelector = 'input[type="radio"]'; // your input selector. Could be any
          return `${yourSelector}:checked ~ .${eClassName}`; // ~ - CSS selector for siblings
        });
      });
    }),
  ],
};
