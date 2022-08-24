const Word = require('./word.model');
// const mongoose = require('mongoose');
const { NOT_FOUND_ERROR } = require('../../errors/appErrors');
const ENTITY_NAME = 'word';

const getAll = async conditions => {
  const { group, page } = conditions;

  return Word.find({ group, page });
};

const get = async id => {
  const word = await Word.findOne({ _id: id });
  if (!word) {
    throw new NOT_FOUND_ERROR(ENTITY_NAME, { id });
  }
  return word;
};

const getRandom = async (group, num) => {
  const word = Word.aggregate([
    { $match: { group } },
    { $sample: { size: num } }
  ]);
  return word;
};

module.exports = { getAll, get, getRandom };
