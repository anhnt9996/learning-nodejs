const { responseError, response } = require('../../lib/helper');
const Task = require('../../Models/Task');
const Obj = require('../../Helpers/Obj');

class TaskController {
  async index(req, res) {
    const tasks = await Task.find({});

    res.json(response(tasks.map((task) => task.detail())));
  }

  async create(req, res) {
    const taskModel = new Task({
      ...req.body,
      userId: req.user.id,
    });

    try {
      const task = await taskModel.save();

      res
        .status(201)
        .json(response(Obj.only(task, ['id', 'title', 'description']), 201));
    } catch (error) {
      res.status(422).json(responseError(422, error.message));
    }
  }

  async show(req, res) {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id, userId: req.user._id });

    if (!task) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find task #${id}`));
    }

    return res.json(response(await task.detail()));
  }

  async getUser(req, res) {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find task #${id}`));
    }

    return res.json(response(await task.detail(true)));
  }

  async update(req, res) {
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

      res.json(response(task.detail()));
    } catch (error) {
      res.status(500).json(responseError(500, error.message));
    }
  }

  async delete(req, res) {
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
  }
}

module.exports = new TaskController();
