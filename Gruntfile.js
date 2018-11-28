const fs = require("fs");

const isEmptyDirectory = (path) => {
	if (!fs.lstatSync(path).isDirectory()) {
		return false;
	}

	const childPaths = fs.readdirSync(path);

	if (childPaths.length === 0) {
		return true;
	}

	const concatPaths = childPaths.map((name) => {
		return path + "\\" + name;
	});

	for (concatPath of concatPaths) {
		if (!isEmptyDirectory(concatPath)) {
			return false;
		}
	}

	return true;
};

module.exports = function(grunt) {
	const DEPLOY_PATH = "D:/Programming/Software/xampp/htdocs";
	const webpackConfig = require("./webpack.config");

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-tslint");
	grunt.loadNpmTasks("grunt-ts");
	grunt.loadNpmTasks("grunt-webpack");
	grunt.loadNpmTasks("grunt-contrib-less");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.initConfig({
		tslint: {
			code: {
				src: ["src/**/*.ts"]
			}
		},
		clean: {
			distCode: ["dist/**/*.js", "dist/**/*.json", "dist/**/*.ts"],
			distTs: ["dist/**/*.ts"],
			distCodeNonMins: ["dist/**/*.js", "!dist/**/bundle.js"],
			distEmpties: {
				src: "dist/**/*",
				filter: function(path) {
					return isEmptyDirectory(path);
				}
			},
			deployCode: {
				src: [DEPLOY_PATH + "/**/*.js", DEPLOY_PATH + "/**/*.json"],
				options: {
					force: true
				}
			},
			distHtml: "dist/**/*.html",
			deployHtml: {
				src: DEPLOY_PATH + "dist/**/*.html",
				options: {
					force: true
				}
			},
			distStyles: ["dist/**/*.css", "dist/**/*.less"],
			distLess: "dist/**/*.less",
			deployStyles: {
				src: DEPLOY_PATH + "/**/*.css",
				options: {
					force: true
				}
			},
			distImages: ["dist/**/*.png", "dist/**/*.jpg", "dist/**/*.ico"],
			deployImages: {
				src: [DEPLOY_PATH + "/**/*.png", DEPLOY_PATH + "/**/*.jpg", DEPLOY_PATH + "/**/*.ico"],
				options: {
					force: true
				}
			},
			dist: "dist/**/*",
			deploy: {
				src: [DEPLOY_PATH + "/**/*"],
				options: {
					force: true
				}
			}
		},
		copy: {
			distCode: {
				files: [
					{
						expand: true,
						cwd: "src",
						src: ["**/*.js", "**/*.json", "**/*.ts"],
						dest: "dist"
					}
				]
			},
			deployCode: {
				files: [
					{
						expand: true,
						cwd: "dist",
						src: "**/*.js",
						dest: DEPLOY_PATH
					}
				]
			},
			distHtml: {
				files: [
					{
						expand: true,
						cwd: "src",
						src: ["**/*.html", "**/.htaccess"],
						dest: "dist"
					}
				]
			},
			deployHtml: {
				files: [
					{
						expand: true,
						cwd: "dist",
						src: ["**/*.html", "**/.htaccess"],
						dest: DEPLOY_PATH
					}
				]
			},
			distStyles: {
				files: [
					{
						expand: true,
						cwd: "src",
						src: "**/*.less",
						dest: "dist"
					}
				]
			},
			deployStyles: {
				files: [
					{
						expand: true,
						cwd: "dist",
						src: "**/*.css",
						dest: DEPLOY_PATH
					}
				]
			},
			distImages: {
				files: [
					{
						expand: true,
						cwd: "src",
						src: ["**/*.png", "**/*.jpg", "**/*.ico"],
						dest: "dist"
					}
				]
			},
			deployImages: {
				files: [
					{
						expand: true,
						cwd: "dist",
						src: ["**/*.png", "**/*.jpg", "**/*.ico"],
						dest: DEPLOY_PATH
					}
				]
			},
			distAll: {
				files: [
					{
						expand: true,
						cwd: "src",
						src: "**",
						dest: "dist"
					}
				]
			},
			deployAll: {
				files: [
					{
						expand: true,
						cwd: "dist",
						src: "**",
						dest: DEPLOY_PATH
					}
				]
			}
		},
		tslint: {
			configuration: "tslint.json",
			code: {
				src: ["src/**/*.ts"]
			}
		},
		ts: {
			default: {
				tsconfig: "./tsconfig.json"
			}
		},
		requirejs: {
			compile: {
				options: {
					baseUrl: "dist/script",
					include: "app.js",
					out: "dist/script/app.js",
					preserveLicenseComments: false
				}
			}
		},
		webpack: {
			options: {
				stats: !process.env.NODE_ENV || process.env.NODE_ENV === "development"
			},
			default: webpackConfig
		},
		less: {
			default: {
				files: {
					"dist/css/style.css": "dist/css/style.less"
				}
			}
		},
		postcss: {
			options: {
				processors: [require("autoprefixer")({ browsers: "last 2 versions" }), require("cssnano")()]
			},
			dist: {
				src: "dist/**/*.css"
			}
		},
		watch: {
			options: {
				atBegin: true,
				livereload: true
			},
			code: {
				files: ["src/**/*.js", "src/**/*.json", "src/**/*.ts"],
				tasks: ["validateCode", "buildCode", "deployCode"]
			},
			html: {
				files: ["src/**/*.html", "src/**/.htaccess"],
				tasks: ["buildHtml", "deployHtml"]
			},
			styles: {
				files: ["src/**/*.less"],
				tasks: ["buildStyles", "deployStyles"]
			},
			images: {
				files: ["src/**/*.png", "src/**/*.jpg", "src/**/*.ico"],
				tasks: ["buildImages", "deployImages"]
			}
		}
	});

	// Code
	grunt.registerTask("validateCode", ["tslint:code"]);
	grunt.registerTask("buildCode", [
		"clean:distCode",
		"copy:distCode",
		"webpack",
		"clean:distTs",
		"clean:distCodeNonMins",
		"clean:distEmpties"
	]);
	grunt.registerTask("deployCode", ["clean:deployCode", "copy:deployCode"]);

	// HTML
	grunt.registerTask("buildHtml", ["clean:distHtml", "copy:distHtml"]);
	grunt.registerTask("deployHtml", ["clean:deployHtml", "copy:deployHtml"]);

	// Styles
	grunt.registerTask("buildStyles", ["clean:distStyles", "copy:distStyles", "less", "postcss", "clean:distLess"]);
	grunt.registerTask("deployStyles", ["clean:deployStyles", "copy:deployStyles"]);

	// Images
	grunt.registerTask("buildImages", ["clean:distImages", "copy:distImages"]);
	grunt.registerTask("deployImages", ["clean:deployImages", "copy:deployImages"]);
};
