const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const getRandom = async (group, num, exclude) =>
  wordRepo.getRandom(group, num, exclude);

module.exports = { getAll, get, getRandom };
