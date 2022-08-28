const wordRepo = require('./userWord.db.repository');

const getAll = async userId => wordRepo.getAll(userId);

const get = async (wordId, userId) => wordRepo.get(wordId, userId);

const getRandom = async (group, page, num, exclude, userId) =>
  wordRepo.getRandom(group, page, num, exclude, userId);

const getRandomCards = async (amount, group, page, num, exclude, userId) => {
  const result = [];
  let words = await getRandom(group, page, num * amount, exclude, userId);
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
