const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "..", "shared"),
        ],
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { modules: false }], "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        mfe_product: "mfe_product@http://localhost:3001/remoteEntry.js",
        mfe_cart: "mfe_cart@http://localhost:3002/remoteEntry.js",
        mfe_reco: "mfe_reco@http://localhost:3003/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
    template: "./public/index.html",
    }),
  ],
};