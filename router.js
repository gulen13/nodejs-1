const express = require('express');
const { createFile, getFiles, getInfo } = require('./files');

const router = express.Router();

router.post('/', createFile);

router.get('/', getFiles);

router.get('/:fileName', getInfo);

module.exports = router;