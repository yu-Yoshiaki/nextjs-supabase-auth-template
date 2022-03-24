module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx}"],
  darkMode: false, // 'media' or 'class'
  theme: {
    colors: {
      blue: "#e5e3d8",
      pink: "#dddee0",
      gray: "#dfe4ea",
      accent: "#bfcad8",
      yellow: "#f5c500",
    },
    extend: {},
  },
  variants: { extend: {} },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
