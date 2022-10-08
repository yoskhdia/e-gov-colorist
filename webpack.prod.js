/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
/* eslint-enable */

module.exports = merge(common, {
    mode: "production",
});
