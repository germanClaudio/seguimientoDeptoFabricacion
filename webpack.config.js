// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {

  entry: "./app.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'main.js'
  },

  devServer: {
    open: true,
    host: "localhost",
  },

  resolve: {
    fallback: {
        "querystring": require.resolve("querystring-es3"),
        "path": require.resolve("path-browserify"),
        "stream": require.resolve("stream-browserify"),
        "zlib": require.resolve("browserify-zlib"),
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "url": require.resolve("url/"),
        "timers": require.resolve("timers-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "util": require.resolve("util/"),
        "assert": require.resolve("assert/"),
        "constants": require.resolve("constants-browserify"),
        "console": require.resolve("console-browserify")
        // "crypto": require.resolve("crypto-browserify"),
    }
  },

  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],

  externals: [
    {
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    },
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.cs$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.png|svg|jpg|gif$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          limit: 3072,
          name: '[name].[ext]',
          publicPath: 'dist/assets/',
          outputPath: 'dist/assets/'
        }
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },

  target: "node",

};

module.exports = () => {
  
  
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
