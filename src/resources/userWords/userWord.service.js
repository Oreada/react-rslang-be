const wordRepo = require('./userWord.db.repository');

const getAll = async userId => wordRepo.getAll(userId);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const getRandom = async (group, page, num, exclude, userId) =>
  wordRepo.getRandom(group, page, num, exclude, userId);

const getRandomCards = async (amount, group, page, num, exclude, userId) => {
  const result = [];
  let wordsCorrect = await getRandom(group, page, amount, exclude, userId);
  let currentPage = page;
  while (wordsCorrect.length < amount && currentPage > 0) {
    currentPage -= 1;
    const wordsCorrectCurrent = await getRandom(
      group,
      currentPage,
      amount,
      exclude,
      userId
    );
    wordsCorrect = wordsCorrect.concat(wordsCorrectCurrent);
  }
  wordsCorrect = wordsCorrect.slice(0, Math.min(amount, wordsCorrect.length));

  let wordsIncorrect = await getRandom(
    group,
    -1,
    amount * num,
    exclude,
    userId
  );
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

const save = async (wordId, userId, userWord) =>
  wordRepo.save(wordId, userId, { ...userWord, wordId, userId });

const update = async (wordId, userId, userWord) =>
  wordRepo.update(wordId, userId, { ...userWord, wordId, userId });

const remove = async (wordId, userId) => wordRepo.remove(wordId, userId);

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
  getRandom,
  getRandomCards
};
