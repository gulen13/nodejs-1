const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const filesPath = path.join(__dirname, "./files");

const createFile = async (fileName, content) => {
	const file = { fileName, content };

	const validatedData = dataValidator(file);
	const error = chalk.bold.red;
	if (validatedData.error) {
		console.log(
			error(
				`Please specify ${validatedData.error.details[0].path[0]} parameter`
			)
		);
		return;
	}
	if (!checkExtension(fileName).result) {
		console.log(
			error(
				`Sorry, application doesn’t support ${
					checkExtension(fileName).extension
				} extension`
			)
		);
		return;
	}
	const pathToFile = path.join(__dirname, "./files", fileName);
	try {
		await fs.writeFile(pathToFile, content, "utf-8");
		console.log(chalk.green("File was created succesfully"));
	} catch (error) {
		console.log(error);
	}
};

const getFiles = async () => {
	const files = await fs.readdir(filesPath);
	if (files.length === 0) {
		const error = chalk.bold.red;
		console.log(error("There are no files in this folder!"));
		return;
	}
	console.log(files);
};

const getInfo = async (fileName) => {
	const files = await fs.readdir(filesPath);
	const file = files.find((file) => file === fileName);
	if (!file) {
		const error = chalk.bold.red;
		console.log(error(`There is no ${fileName} in this folder!`));
		return;
	}
	const filePath = path.join(__dirname, "./files", fileName);
	const fileInfo = await fs.readFile(filePath, "UTF-8");

	const fileExtension = path.extname(file);

	const name = path.basename(filePath, fileExtension);

	console.log({
		filename: name,
		extension: fileExtension,
		content: fileInfo,
	});
};

module.exports = {
	createFile,
	getFiles,
	getInfo,
};
