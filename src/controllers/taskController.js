const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
  
      const newTask = await Task.create({
        title,
        description,
        assignedTo: null,
        completed: false,
      });
  
      res.status(201).json(newTask);
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.assignTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const assignedTo = req.body.assignedTo;
  
      const task = await Task.findByPk(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.assignedTo = assignedTo;
  
      await task.save();
  
      res.json(task);
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
};
  
exports.deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id; 

      const task = await Task.findByPk(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      await task.destroy();
  
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.completeTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const task = await Task.findByPk(taskId);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      task.completed = true;
  
      await task.save();
  
      res.json(task);
    } catch (error) {
      
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  