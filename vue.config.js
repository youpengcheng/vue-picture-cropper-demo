/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const resolve = dir => path.join(__dirname, dir);
const isDev = process.env.NODE_ENV === 'development' ? true : false;

module.exports = {
  publicPath: isDev ? '/' : 'https://cdn.jsdelivr.net/gh/chengpeiquan/vue-picture-cropper-demo@gh-pages/',
  assetsDir: 'static',
  productionSourceMap: false,
  lintOnSave: false,
  devServer:{
    port: 1234,
    disableHostCheck: true,
    // proxy: {
    //   '/xxx': {
    //     target: 'https://xxx.com/xxx',
    //     ws: true,
    //     changOrigin: true
    //   }
    // }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          // modifyVars: {
          //   hack: `true; @import '~@less/config.less'`,
          // },
        },
      },
    },
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@img',resolve('src/assets/img'))
      .set('@styl',resolve('src/assets/styl'))
      .set('@js',resolve('src/assets/js'))
      .set('@ts',resolve('src/assets/ts'))
      .set('@fonts', resolve('src/assets/fonts'))
      .set('@css', resolve('src/assets/css'))
      .set('@libs',resolve('src/libs'))
      .set('@cp',resolve('src/components'))
      .set('@views',resolve('src/views'))
      .set('@plugins',resolve('src/plugins'))
      .end()
    config.module
      .rule('images')
        .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: 10000,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'static/img/[name].[hash:8].[ext]'
              }
            }
          })
        .end()
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new webpack.BannerPlugin(' The roject developed by chengpeiquan! ')
      ]
    };
  }
}
