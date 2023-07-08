const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

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

module.exports = {
	createFile,
};
