const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const get = async wordId => {
  const word = await wordRepo.get(wordId);

  return word;
};

const getRandom = async (group, page, num) =>
  wordRepo.getRandom(group, page, num);

const getRandomCards = async (amount, group, page, num) => {
  const result = [];
  let wordsCorrect = await getRandom(group, page, amount);
  let wordsIncorrect = await getRandom(group, -1, amount * num);
  const wordsCorrectArray = [];
  wordsCorrect.forEach(wordCorrect => {
    wordsCorrectArray.push(wordCorrect._id);
  });

  wordsIncorrect = wordsIncorrect.filter(word => {
    return wordsCorrectArray.indexOf(word._id) === -1;
  });

  const wordsCorrectLength = wordsCorrect.length;
  for (let i = 0; i < wordsCorrectLength; i++) {
    const correct = wordsCorrect[0];
    const options = wordsIncorrect.slice(1, num);
    result.push({
      correct,
      incorrect: options
    });
    wordsCorrect = wordsCorrect.slice(1, wordsCorrect.length);
    wordsIncorrect = wordsIncorrect.slice(num, wordsIncorrect.length);
  }

  return result;
};

module.exports = { getAll, get, getRandom, getRandomCards };
