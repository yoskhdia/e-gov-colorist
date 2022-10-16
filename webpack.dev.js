/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
/* eslint-enable */

module.exports = function (env) {
    return merge(common(env), {
        mode: "development",
        devtool: "inline-source-map",
    });
};
