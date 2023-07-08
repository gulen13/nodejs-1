const checkExtension = (fileName) => {
	const EXTENSIONS = ["txt", "html", "js", "json", "css"];
	const data = fileName.split(".");
	const extension = data[data.length - 1];
	const result = EXTENSIONS.includes(extension);
	return { extension, result };
};

module.exports = checkExtension;
