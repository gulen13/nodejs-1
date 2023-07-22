const fs = require("fs/promises");
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const filesPath = path.join(__dirname, "./files");

const createFile = async (req, res) => {

	const { fileName, content } = req.body;

	const validatedData = dataValidator(req.body);

	if (validatedData.error) {
		res.status(400).json({ message: `Please specify ${validatedData.error.details[0].path[0]} parameter` })
		return;
	}
	if (!checkExtension(fileName).result) {
		res.status(400).json({
			message: `Sorry, application doesn’t support ${checkExtension(fileName).extension
				} extension`
		})
		return;
	}
	const pathToFile = path.join(__dirname, "./files", fileName);
	try {
		await fs.writeFile(pathToFile, content, "utf-8");
		res.status(201).json({ message: 'File was created succesfully' })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
};

const getFiles = async (req, res) => {
	const files = await fs.readdir(filesPath);
	if (files.length === 0) {
		res.status(404).json({ message: "There are no files in this folder!" })
		return;
	}
	res.json(files);
};

const getInfo = async (req, res) => {
	const { fileName } = req.params;
	const files = await fs.readdir(filesPath);
	const file = files.find((file) => file === fileName);
	if (!file) {
		res.status(404).json({ message: `There is no ${fileName} in this folder!` })
		return;
	}
	const filePath = path.join(__dirname, "./files", fileName);
	const fileInfo = await fs.readFile(filePath, "UTF-8");
	const fileExtension = path.extname(file);
	const name = path.basename(filePath, fileExtension);

	res.json({
		filename: name,
		extension: fileExtension,
		content: fileInfo,
	})
};

module.exports = {
	createFile,
	getFiles,
	getInfo,
};
