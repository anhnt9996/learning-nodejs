const express = require('express');

require('./database/mongoose');
const User = require('./app/Http/Models/User');
const Task = require('./app/Http/Models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const response = (data, code = 200) => {
  return {
    code,
    data: data,
  };
};

const responseError = (code, message) => {
  return {
    code,
    message,
  };
};

app.get('/users', async (req, res) => {
  const users = await User.find({});

  res.json(response(users.map((user) => ({ id: user.id, name: user.name }))));
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json(responseError(404, `Cannot find user #${id}`));
  }

  res.json(response({ id: user.id, name: user.name }));
});

app.post('/users', async (req, res) => {
  const userModel = new User(req.body);

  const exists = await User.exists({ username: req.body.username });

  if (exists) {
    return res
      .status(422)
      .json(responseError(422, 'Username already taken by other user!'));
  }

  try {
    const user = await userModel.save();

    res.status(201).json(response({ id: user.id, name: user.name }, 201));
  } catch (error) {
    res.status(422).json(responseError(422, error.message));
  }
});

app.post('/tasks', async (req, res) => {
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

app.get('/tasks', async (req, res) => {
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

app.get('/tasks/:id', async (req, res) => {
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

app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res
        .status(404)
        .json(responseError(404, `Cannot find task #${id}`));
    }

    await Task.update({ _id: id }, { isCompleted: !task.isCompleted });

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

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
