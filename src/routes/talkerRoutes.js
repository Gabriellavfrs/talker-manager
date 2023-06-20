const express = require('express');

const utilsFile = require('../utils');

const router = express.Router();

const {   
  headerValidation,
  bodyValidation,
  watchedQueryValidation,
  rateQueryValidation,
  rateValidationToEdit,
} = require('../middlewares/validations');

router.get('/search', headerValidation, watchedQueryValidation,
rateQueryValidation, async (req, res) => {
 const q = req.query.q || '';
 const date = req.query.date || '';
 const rate = req.query.rate || '';

  const talkersArray = await utilsFile.readTalkerFile();
  if (!Object.keys(req.query)) {
    return res.status(200).json(talkersArray);
  }
  const filteredTalkers = await utilsFile.filterByQueries(q, rate, date);
  res.status(200).json(filteredTalkers);
});

router.get('/', async (req, res) => {
  const talkersArray = await utilsFile.readTalkerFile();
  res.status(200).json(talkersArray);
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const talkersArray = await utilsFile.readTalkerFile();
  const talkerById = talkersArray.find((t) => t.id === Number(id));
  if (!talkerById) {
    return next({ statusCode: 404, message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(talkerById);
});

router.post('/', headerValidation,
bodyValidation, async (req, res) => {
  const lastId = await utilsFile.gettLastId();
  const newTalker = {
    id: lastId + 1,
    ...req.body,
  };
  await utilsFile.insertTalker(newTalker);
  res.status(201).json((newTalker));
});

router.put('/:id', headerValidation, bodyValidation, async (req, res, next) => {
  const { id } = req.params;
  const talkersArray = await utilsFile.readTalkerFile();
  if (!talkersArray.find((t) => t.id === Number(id))) {
    return next({ statusCode: 404, message: 'Pessoa palestrante não encontrada' });
  }
  const editedTalker = {
    id: Number(id),
    ...req.body,
  };
  await utilsFile.editTalker(editedTalker);
  res.status(200).json((editedTalker));
});

router.delete('/:id', headerValidation, async (req, res) => {
  const { id } = req.params;
  await utilsFile.deleteTalker(Number(id));
  res.sendStatus(204);
});

router.patch('/rate/:id', headerValidation, rateValidationToEdit, async (req, res) => {
  const { id } = req.params;
  const talkersArray = await utilsFile.readTalkerFile();
  const talkerInfo = talkersArray.find((t) => t.id === Number(id));
  talkerInfo.talk.rate = req.body.rate;
  await utilsFile.editTalker(talkerInfo);
  res.sendStatus(204);
});

module.exports = router;