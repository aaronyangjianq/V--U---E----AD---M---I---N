const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const configs = require('./config');

function resolves(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'assets',
  indexPath: 'index.html',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      /**
       * moment.js 语言设置过滤
       */
      // 1、配置语言包（无须手动引入语言包）
      // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
      // 2、过滤语言包（需手动引入语言包）
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      /**
       * webpack打包分析
       */
      new BundleAnalyzerPlugin({
        analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
        generateStatsFile: configs.preview, // 是否生成stats.json文件
      }),
    ],
    resolve: {
      alias: {
        /**
         * 配置路径
         */
        '@$': resolves('src'),
        'config': resolves('./config/index.js'),
        // antd-icon优化配置(按需打包)
        '@ant-design/icons/lib/dist$': resolves('./src/core/antd/icons.js'),
      },
    },
  },
  // less@3.x 配置 javascriptEnabled: true
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    // development server port 8000
    port: configs.port,
    /**
     * 设置代理
     * 默认：关闭 （删除注释即开启）
     */
    proxy: {
      '/admin': {
        target: configs.apihost,
        // pathRewrite: { '^/api': '' },
        changeOrigin: true,
        ws: false,
      },
    },
  },
};
