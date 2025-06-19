import Task from '../model/task.model.js';  

export const createTask = async (req, res) => {

    console.log(req.body)
  try {
    const { title, description, is_completed, image } = req.body;


    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const task = await Task.create({
      user: req.user._id,  // from protect middleware
      title,
      description,
      is_completed,
      image,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

// // @desc Get single task by ID
export const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch task' });
  }
};

// // @desc Update task by ID
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { ...req.body },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ success: true, task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

// // @desc Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
