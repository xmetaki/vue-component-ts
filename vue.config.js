// eslint-disable-next-line @typescript-eslint/no-var-requires
// const webpack = require('webpack')

module.exports = {
  // publicPath: '/dist',
  productionSourceMap: false,

  configureWebpack: {
    performance: {
      hints: 'warning',
      maxEntrypointSize: 60000000,
      maxAssetSize: 40000000,
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: []
    }
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }

  // chainWebpack (config) {
  //   // provide the app's title in webpack's name field, so that
  //   // it can be accessed in index.html to inject the correct title.

  //   // https://webpack.js.org/configuration/devtool/#development
  //   config.when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-eval-source-map'))

  //   // remove vue-cli-service's progress output
  //   config.plugins.delete('progress')
  //   // replace with another progress output plugin to solve the this bug:
  //   // https://github.com/vuejs/vue-cli/issues/4557
  //   config.plugin('simple-progress-webpack-plugin').use(require.resolve('simple-progress-webpack-plugin'), [
  //     {
  //       format: 'compact'
  //     }
  //   ])

  //   config.when(process.env.NODE_ENV !== 'development', config => {
  //     config.optimization.splitChunks({
  //       chunks: 'all',
  //       cacheGroups: {
  //         libs: {
  //           name: 'chunk-libs',
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: 10,
  //           chunks: 'initial'
  //         },
  //         msunCoreBusiness: {
  //           name: 'chunk-msunCoreBusiness',
  //           priority: 20,
  //           test: /[\\/]node_modules[\\/]_?msun-core-business(.*)/
  //         }
  //       }
  //     })
  //     config.optimization.runtimeChunk('single')
  //   })
  // }
}
