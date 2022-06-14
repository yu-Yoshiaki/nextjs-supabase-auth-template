module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
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
    extend: {
      colors: {},
    },
  },
  variants: { extend: {} },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
