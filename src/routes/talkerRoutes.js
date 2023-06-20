const express = require('express');

const fs = require('fs/promises');
const utilsFile = require('../utils');

const router = express.Router();

const {   
  postHeaderValidation,
  postBodyValidation,
} = require('../middlewares/validations');

router.get('/', async (req, res) => {
  const talkersArray = await fs.readFile('src/talker.json', 'utf8');

  res.status(200).json(JSON.parse(talkersArray));
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkersArray = await utilsFile.readTalkerFile();
  const talker = talkersArray.find((t) => t.id === Number(id));
  if (!talker) {
    return next({ statusCode: 404, message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talker);
});

router.post('/', postHeaderValidation,
postBodyValidation, async (req, res) => {
  const lastId = await utilsFile.gettLastId();
  const newTalker = {
    id: lastId + 1,
    ...req.body,
  };
  await utilsFile.insertTalker(newTalker);
  res.status(201).json((newTalker));
});

module.exports = router;