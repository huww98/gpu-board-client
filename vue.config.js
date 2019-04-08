const webpack = require("webpack");

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.NormalModuleReplacementPlugin(/api-datasource\.ts$/, `./api-${process.env.DATA_SOURCE}.ts`)
    ]
  },
};
