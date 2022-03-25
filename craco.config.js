module.exports = {
  webpack: {
    // 定义所需的依赖从 html 引入的包中获取
    configure(webpackConfig, { env, paths }) {
      webpackConfig.externals = {
        react: "var window.React",
        "react-dom": "var window.ReactDOM",
        "prop-types": "var window.PropTypes",
        "@alifd/next": "var window.Next",
        moment: "var window.moment",
        lodash: "var window._",
      };

      return webpackConfig;
    },
  },
};
