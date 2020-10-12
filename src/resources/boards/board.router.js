const router = require('express').Router();
const boardsService = require('./board.service');
const taskRouter = require('../tasks/task.router');

router.use(
  '/:id/tasks/',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const newBoard = await boardsService.add(req.body);
    if (newBoard) {
      res.json(newBoard);
    } else {
      res.status(400).send('Bad request');
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Board not found');
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.upd(req.params.id, req.body);
    if (board) {
      res.json(board);
    } else {
      res.status(404).send('Board not found');
    }
  })
  .delete(async (req, res) => {
    if (await boardsService.del(req.params.id)) {
      res.status(204).end();
    } else {
      res.status(404).send('Board not found');
    }
  });

module.exports = router;
