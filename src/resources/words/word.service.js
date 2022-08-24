const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const getRandom = async (group, num, exclude) =>
  wordRepo.getRandom(group, num, exclude);

const getRandomCards = async (amount, group, num, exclude) => {
  const result = [];
  let words = await getRandom(group, num * amount, exclude);
  for (let i = 0; i < amount; i++) {
    const correct = words[0];
    const options = words.slice(1, num);
    result.push({
      correct,
      incorrect: options
    });
    words = words.slice(num, words.length);
  }

  return result;
};

module.exports = { getAll, get, getRandom, getRandomCards };
