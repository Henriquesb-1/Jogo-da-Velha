const webpack = require("webpack")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const path = require("path")

const extractCSSPlugin = require("mini-css-extract-plugin")

const minimizerCSS = require("css-minimizer-webpack-plugin")
const minimizerHTML = require("html-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
module.exports = {
    mode: "production",
    entry: "./src/index.js",
    devServer: {
        static: {
            directory: path.join(__dirname + "/src"),
            watch: true
        },
        port: "9000"
    },
    output: {
        filename: "app.js",
        path: __dirname + "/public"
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { context: "src", from:"*.html" }
            ]
        }),
        new extractCSSPlugin({
            filename: "style.css"
        })
    ],

    optimization: {
        minimizer: [
            new minimizerCSS(),
            new minimizerHTML(),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i
            })
        ]
    },

    module: {
        rules: [{
            test: /\.s?[ac]ss$/,
            use: [extractCSSPlugin.loader, "css-loader", "sass-loader"]
        }]
    }
}
