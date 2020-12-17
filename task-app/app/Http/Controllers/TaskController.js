const { responseError, response } = require('../../lib/helper');
const Task = require('../../Models/Task');
const Obj = require('../../Helpers/Obj');

class TaskController {
  async index(req, res) {
    const { user } = req;
    const tasks = await Task.find({ user_id: user._id });

    res.json(response(await Promise.all(tasks.map((task) => task.detail()))));
  }

  async create(req, res) {
    const taskModel = new Task({
      ...req.body,
      user_id: req.user.id,
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

    const task = await Task.findOne({ _id: id, user_id: req.user._id });

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
      const task = await Task.findOne({ _id: id, user_id: req.user._id });

      if (!task) {
        return res
          .status(404)
          .json(responseError(404, `Cannot find task #${id}`));
      }

      await Task.update(
        { _id: id },
        { is_completed: !task.is_completed },
        { runValidators: true }
      );

      res.json(response(await task.detail()));
    } catch (error) {
      res.status(500).json(responseError(500, error.message));
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    try {
      const task = await Task.findOneAndDelete({
        _id: id,
        user_id: req.user._id,
      });

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
