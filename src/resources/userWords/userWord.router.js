const { OK, NO_CONTENT } = require('http-status-codes');
const router = require('express').Router({ mergeParams: true });
const { userWord, wordId } = require('../../utils/validation/schemas');
const { validator } = require('../../utils/validation/validator');
const extractQueryParam = require('../../utils/getQueryNumberParameter');

const userWordService = require('./userWord.service');

router.get('/', async (req, res) => {
  const userWords = await userWordService.getAll(req.userId);
  res.status(OK).send(userWords.map(w => w.toResponse()));
});

router.get('/random/', async (req, res) => {
  const group = extractQueryParam(req.query.group, 0);
  const page = extractQueryParam(req.query.page, -1);
  const num = extractQueryParam(req.query.num, 0);
  const exclude = req.query.exclude ? req.query.exclude : 'easy';

  const words = await userWordService.getRandom(
    group,
    page,
    num,
    exclude,
    req.userId
  );
  res.status(OK).send(words);
});

router.get('/random/card/:amount', async (req, res) => {
  const group = extractQueryParam(req.query.group, 0);
  const page = extractQueryParam(req.query.page, -1);
  const amount = extractQueryParam(req.params.amount, 1);
  const num = extractQueryParam(req.query.num, 0);
  const exclude = req.query.exclude ? req.query.exclude : 'easy';

  const result = await userWordService.getRandomCards(
    amount,
    group,
    page,
    num,
    exclude,
    req.userId
  );
  res.status(OK).send(result);
});

router.get('/:wordId', validator(wordId, 'params'), async (req, res) => {
  const word = await userWordService.get(req.params.wordId, req.userId);
  res.status(OK).send(word.toResponse());
});

router.post(
  '/:wordId',
  validator(wordId, 'params'),
  validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.save(
      req.params.wordId,
      req.userId,
      req.body
    );
    res.status(OK).send(word.toResponse());
  }
);

router.put(
  '/:wordId',
  validator(wordId, 'params'),
  validator(userWord, 'body'),
  async (req, res) => {
    const word = await userWordService.update(
      req.params.wordId,
      req.userId,
      req.body
    );
    res.status(OK).send(word.toResponse());
  }
);

router.delete('/:wordId', validator(wordId, 'params'), async (req, res) => {
  await userWordService.remove(req.params.wordId, req.userId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
