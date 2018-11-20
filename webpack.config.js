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
		// options related to how webpack emits results
		path: path.resolve(__dirname, "dist/script"), // string
		// the target directory for all output files
		// must be an absolute path (use the Node.js path module)
		filename: "bundle.js", // string    // the filename template for entry chunks
		publicPath: "/assets/", // string    // the url to the output directory resolved relative to the HTML page
		library: "MyLibrary", // string,
		// the name of the exported library
		libraryTarget: "umd" // universal module definition    // the type of the exported library
		/* Advanced output configuration (click to show) */
	}
};
