const prod = process.env.NODE_ENV === "production";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: prod ? "production" : "development",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ["", ".js", ".jsx", ".json"],
        },
        loader: "babel-loader",
      },

      /* {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }, */
      {test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
    ],
  },
  devtool: prod ? undefined : "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
