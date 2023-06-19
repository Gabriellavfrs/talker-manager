const express = require('express');

const fs = require('fs/promises');
const utilsFile = require('../utils');

const route = express.Router();

route.get('/', async (req, res) => {
  const talkersArray = await fs.readFile('src/talker.json', 'utf8');

  res.status(200).json(JSON.parse(talkersArray));
});

route.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkersArray = await utilsFile.readTalkerFile();
  const talker = talkersArray.find((t) => t.id === Number(id));
  if (!talker) {
    return next({ statusCode: 404, message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

module.exports = route;