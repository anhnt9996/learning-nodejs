const express = require('express');
const router = express.Router();

const { response, responseError } = require('../../app/lib/helper');
const Task = require('../../app/Models/Task');

router.post('/', async (req, res) => {
  const taskModel = new Task(req.body);

  try {
    const task = await taskModel.save();

    res.status(201).json(
      response(
        {
          id: task._id,
          title: task.title,
          description: task.description,
        },
        201
      )
    );
  } catch (error) {
    res.status(422).json(responseError(422, error.message));
  }
});

router.get('/', async (req, res) => {
  const tasks = await Task.find({});

  res.json(
    response(
      tasks.map((task) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
      }))
    )
  );
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const task = await Task.findById(id);

  if (!task) {
    return res.status(404).json(responseError(404, `Cannot find task #${id}`));
  }

  return res.json(
    response({
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
    })
  );
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find task #${id}`));
    }

    await Task.update(
      { _id: id },
      { isCompleted: !task.isCompleted },
      { runValidators: true }
    );

    res.json(
      response({
        id: task._id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
      })
    );
  } catch (error) {
    res.status(500).json(responseError(500, error.message));
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find task #${id}`));
    }

    res.json(response([], undefined, `Task #${id} has been deleted!`));
  } catch (error) {
    res.status(500).json(responseError(500, error.message));
  }
});

module.exports = router;
