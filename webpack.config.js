const path = require("path");

module.exports = {
	mode: "development",
	devtool: "inline-source-map",
	entry: "./dist/script/script.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"]
	},
	output: {
		path: path.resolve(__dirname, "dist/script"),
		filename: "bundle.js",
		library: "fortnitro.map",
		libraryTarget: "umd"
	}
};
