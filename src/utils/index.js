const fs = require('fs/promises');

const readTalkerFile = async () => {
  const resultArray = await fs.readFile('src/talker.json', 'utf8');
  return JSON.parse(resultArray);
};

const gettLastId = async () => {
  const resultArray = await readTalkerFile();
  const lastId = resultArray[resultArray.length - 1];
  return lastId.id;
};

module.exports = {
  readTalkerFile,
  gettLastId,
};