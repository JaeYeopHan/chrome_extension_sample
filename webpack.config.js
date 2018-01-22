const merge = require("webpack-merge");

const webpackCommonConfig = require("./build/webpack/common");
const webpackDevConfig = require("./build/webpack/dev");
const webpackProdConfig = require("./build/webpack/production");

module.exports = ({dev = false} = {}) => {
    return merge(
        webpackCommonConfig,
        dev ? webpackDevConfig : webpackProdConfig
    );
};
