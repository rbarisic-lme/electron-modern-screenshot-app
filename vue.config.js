const MakeDirWebpackPlugin = require('make-dir-webpack-plugin');

module.exports = {
  lintOnSave: false,
  assetsDir: 'assets',
  configureWebpack: {
    plugins: [
      new MakeDirWebpackPlugin({
        dirs: [
          { path: './dist_electron/temp' },
        ]
      })
    ],
    resolve: {
      alias: {
        // '@': path.join(__dirname, 'client'),
        // '@UI':  thisPath + '/components/UI',
        // '@Config': thisPath + '/config/config.js',
      }
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.(png|jpg|gif|svg|mp3|ogg|flac|ico|cmd|bat)$/,
    //       loader: 'file-loader',
    //       options: {
    //       //   name: '[name].[ext]?[hash]'
    //         esModule: false
    //       }
    //     },
    //   ]
    // },
  //   optimization: {
  //     splitChunks: {
  //       cacheGroups: {
  //         styles: {
  //           name: 'styles',
  //           test: /\.css$/,
  //           chunks: 'all',
  //           enforce: true,
  //         },
  //       },
  //     },
  //   },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "appId": "com.xrlabs.modernScreenshots",
        "productName": "modern_screenshots",
        "copyright": "Copyright © 2020 Robert Barisic, xrlabs",
        "extraResources": [
          {
            "from": "./buildResources/",
            "to": "resources",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    }
  },
  // pluginOptions: {
    // "style-resources-loader": {
      // preProcessor: "scss",
      // patterns: [path.resolve(__dirname, "./src/assets/css/xrl_menu.scss")]
    // }
  // },
  css: {
    // extract: { 
    //   filename: 'assets/css/[name].css', // to have a name related to a theme
    //   // chunkFilename: 'assets/css/[name].css',
    //   // modules: false,
    //   // sourceMap: true
    // },
    loaderOptions: {
      // pass options to sass-loader
      // @/ is an alias to src/
      // so this assumes you have a file named `src/variables.sass`
      // Note: this option is named as "data" in sass-loader v7
      sass: {
        prependData: `@import "~@/assets/_variables.sass"`
      },
      // by default the `sass` option will apply to both syntaxes
      // because `scss` syntax is also processed by sass-loader underlyingly
      // but when configuring the `data` option
      // `scss` syntax requires an semicolon at the end of a statement, while `sass` syntax requires none
      // in that case, we can target the `scss` syntax separately using the `scss` option
      scss: {
        prependData: `@import "~@/assets/_variables.scss";`
      }
    }
  }
}