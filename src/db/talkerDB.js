const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM talkers;',
  );
  const formatedResult = result.map(({ name, age, id, ...talk }) => ({ 
    name, 
    age, 
    id, 
    talk: {
      watchedAt: talk.talk_watched_at,
      rate: talk.talk_rate,
    },
  }));
  return formatedResult;
};

module.exports = {
  getAll,
};
