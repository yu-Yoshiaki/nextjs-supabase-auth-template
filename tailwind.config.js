module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  darkMode: false, // 'media' or 'class'
  theme: {
    colors: {
      white: "#fafafa",
      blue: "#3b82f6",
      pink: "#f9a8d4",
      gray: "#d1d5db",
      accent: "#6ee7b7",
      yellow: "#fde047",
    },
    fontFamily: {
      body: [
        "ヒラギノ角ゴシック",
        "Hiragino Sans",
        "Hiragino Kaku Gothic ProN",
        "ヒラギノ角ゴ ProN W3",
        "メイリオ",
        "Meiryo",
        "sans-serif",
      ],
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
