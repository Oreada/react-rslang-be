const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const getRandom = async (group, num) => wordRepo.getRandom(group, num);

const getRandomCards = async (amount, group, num) => {
  const result = [];
  let words = await getRandom(group, num * amount);
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
