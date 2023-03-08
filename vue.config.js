const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: "@/assets",
        components: "@/components",
        config: "@/config",
        network: "@/network",
        utils: "@/utils",
        views: "@/views",
        styles: "@/styles",
        utils: "@/utils",
        icons: "@/icons",
      },
    },
  },
  devServer: {
    port: 5910,
    proxy: {
      ["/proxy"]: {
        target: "http://localhost:2233",
        changeOrigin: true,
        pathRewrite: {
          ["^" + "/proxy"]: "",
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 全局变量路径
        resolve("./src/styles/variables.less"),
      ],
    },
  },
};
