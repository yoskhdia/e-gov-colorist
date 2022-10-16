/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
/* eslint-enable */

module.exports = function (env) {
    const appTarget = env.APP_TARGET || "chrome";
    if (appTarget !== "chrome" && appTarget !== "firefox") {
        throw `Invalid APP_TARGET value "${appTarget}".`;
    }
    console.log("target = " + appTarget);

    return {
        entry: {
            background: path.join(__dirname, "src/background.ts"),
            popup: path.join(__dirname, "src/popup/index.tsx"),
            lawsPageWorker: path.join(__dirname, "src/lawsPageWorker.ts"),
        },
        output: {
            path: path.join(__dirname, "dist/js"),
            filename: "[name].js",
            clean: true,
        },
        module: {
            rules: [
                {
                    exclude: /node_modules/,
                    test: /\.tsx?$/,
                    use: "ts-loader",
                },
                // Treat src/css/app.css as a global stylesheet
                {
                    test: /\app.css$/,
                    use: ["style-loader", "css-loader", "postcss-loader"],
                },
                // Load .module.css files as CSS modules
                {
                    test: /\.module.css$/,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                            },
                        },
                        "postcss-loader",
                    ],
                },
            ],
        },
        // Setup @src path resolution for TypeScript files
        resolve: {
            extensions: [".ts", ".tsx", ".js"],
            alias: {
                "@src": path.resolve(__dirname, "src/"),
            },
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: path.resolve(__dirname, "resources/", appTarget),
                        to: path.resolve(__dirname, "dist/"),
                    },
                ],
            }),
        ],
        watchOptions: {
            ignored: /node_modules/,
        },
    };
};
