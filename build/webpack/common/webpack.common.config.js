const webpack = require('webpack');
const path = require("path");
const packageJSON = require("../../../package.json");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
	entry: {
		"js/bundle": "./src/index.ts"
	},

    output: {
		filename: "[name].js",
        path: path.resolve(process.cwd(), "dist"),
        devtoolModuleFilenameTemplate: `${path.basename(packageJSON.name)}:///[resource-path]?[loaders]`
    },
    
    resolve: {
        modules: [ path.join(__dirname, "../../../packages"), "node_modules"],
        extensions: [".ts", ".tsx", ".js"]
    },

	module: {
		rules: [
            {
                test: /\.ts?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'awesome-typescript-loader',
            },
            {
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					"url-loader?limit=10000",
					"img-loader",
				],
			},
            {
                test: /\.(css|sass|scss)$/,
                use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [{
						loader: "css-loader",
					}, {
						loader: "sass-loader",
					}],
				}),
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
};
