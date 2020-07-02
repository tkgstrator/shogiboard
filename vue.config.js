module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  publicPath: process.env.NODE_ENV === "production"
    ? "/ShogiBoard/" : "/",
  productionSourceMap: false,
  assetsDir: "",
  outputDir: "./dist"
}