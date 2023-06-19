const fs = require('fs/promises');

const readTalkerFile = async () => {
  const resultArray = await fs.readFile('src/talker.json', 'utf8');
  return JSON.parse(resultArray);
};

module.exports = {
  readTalkerFile,
};