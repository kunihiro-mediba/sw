const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const tsRule = {
    test: /\.ts$/,
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: [
                    ["@babel/preset-env", {
                        targets: {
                            chrome: 88,
                            ios: 13,
                        },
                        useBuiltIns: "usage",
                        corejs: "3.10",
                        debug: true,
                    }],
                    "@babel/preset-typescript",
                ],
            },
        },
    ],
};

module.exports = {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: {
        main: path.resolve(__dirname, "src/main.ts"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[fullhash].js",
    },
    module: {
        rules: [tsRule],
    },
    resolve: {
        extensions: [".ts", ".js", ".mjs"],
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            filename: "index.html",
            inject: "head",
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW(),
    ],
    devtool: "source-map",
    devServer: {
        port: 8000,
    },
};
