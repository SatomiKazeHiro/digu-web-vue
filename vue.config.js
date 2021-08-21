module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'config': '@/config',
        'network': '@/network',
        'utils': '@/utils',
        'views': '@/views',
      }
    },
  },
  devServer: {
    proxy: {
      ["/proxy"]: {
        target: 'http://localhost:2233',
        changeOrigin: true,
        pathRewrite: {
          ['^' + "/proxy"]: ''
        }
      }
    }
  }
}
