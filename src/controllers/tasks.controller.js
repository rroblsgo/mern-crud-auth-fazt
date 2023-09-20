import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).populate({
    path: 'user',
    select: 'username email -_id',
  });
  res.json(tasks);
};
export const createTask = async (req, res) => {
  const { title, description, date } = req.body;
  const newTask = new Task({ title, description, date, user: req.user.id });
  const savedTask = await newTask.save();
  res.status(201).json(savedTask);
};
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate('user', [
      'username',
      'email',
    ]);
    // console.log(task.user.username);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
};
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
};
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    // res.json(task);
    return res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: 'Task not found' });
  }
};
