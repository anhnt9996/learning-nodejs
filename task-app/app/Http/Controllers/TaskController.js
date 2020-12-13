const { responseError, response } = require('../../lib/helper');
const Task = require('../../Models/Task');
const Obj = require('../../Helpers/Obj');

class TaskController {
  async index(req, res) {
    const tasks = await Task.find({});

    res.json(
      response(
        tasks.map((task) =>
          Obj.only(task, ['id:test', 'title', 'description', 'isCompleted'])
        )
      )
    );
  }

  async create(req, res) {
    const taskModel = new Task(req.body);

    try {
      const task = await taskModel.save();

      res
        .status(201)
        .json(response(Obj.only(task, ['id', 'title', 'description']), 201));
    } catch (error) {
      res.status(422).json(responseError(422, error.message));
    }
  }
}

module.exports = new TaskController();
