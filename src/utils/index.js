const fs = require('fs/promises');

const readTalkerFile = async () => {
  const talkersArray = await fs.readFile('src/talker.json', 'utf8');
  return JSON.parse(talkersArray);
};

const gettLastId = async () => {
  const talkersArray = await readTalkerFile();
  const lastId = talkersArray[talkersArray.length - 1];
  return lastId.id;
};

const insertTalker = async (talker) => {
  const talkersArray = await readTalkerFile();
  talkersArray.push(talker);
  return fs.writeFile('src/talker.json', JSON.stringify(talkersArray));
};

const editTalker = async (editedTalker) => {
  const talkersArray = await readTalkerFile();
  const talkerIndex = talkersArray.findIndex((t) => t.id === editedTalker.id);
  talkersArray[talkerIndex] = editedTalker;
  return fs.writeFile('src/talker.json', JSON.stringify(talkersArray));
};

module.exports = {
  readTalkerFile,
  gettLastId,
  insertTalker,
  editTalker,
};