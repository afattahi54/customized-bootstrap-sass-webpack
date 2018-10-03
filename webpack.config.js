const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    welcome: "./src/welcome.js",
    login: "./src/login.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    sourceMapFilename: "[file].map"
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ["welcome"],
      filename: "welcome.html",
      template: "src/welcome.html"
    }),
    new HtmlWebpackPlugin({
      chunks: ["login"],
      filename: "login.html",
      template: "src/login.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"]
      },
      // Loader for the image files
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: "img/[name].[ext]"
        }
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /images/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "../fonts/"
            }
          }
        ]
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader" //add CSS to page
          },
          {
            loader: "css-loader" //Convert CSS into CommonJS module
          },
          {
            loader: "postcss-loader", //Run post css actions
            options: {
              plugins: function() {
                // post css plugins, can be exported to postcss.config.js
                return [require("precss"), require("autoprefixer")];
              }
            }
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      }
    ]
  }
};
