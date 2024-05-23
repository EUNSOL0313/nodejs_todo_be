const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
   try {
      const { task, isComplete } = req.body
      const newTask = new Task({ task, isComplete })
      await newTask.save()
      res.status(200).json({ status: 'ok', data: newTask })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

taskController.getTask = async (req, res) => {
   try {
      const tasklist = await Task.find({}).select('-__v')
      res.status(200).json({ status: 'ok', data: tasklist })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

taskController.putTask = async (req, res) => {
   try {
      const task = await Task.findById(req.params.id)
      if (!task) {
         throw new Error('App can not find the task')
      }
      const fields = Object.keys(req.body)
      fields.map((item) => (task[item] = req.body[item]))
      await task.save()
      res.status(200).json({ status: 'ok', data: task })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

taskController.deleteTask = async (req, res) => {
   try {
      const deleteItem = await Task.findByIdAndDelete(req.params.id)
      res.status(200).json({ status: 'ok', data: deleteItem })
   } catch (err) {
      res.status(400).json({ status: 'fail', error: err })
   }
}

module.exports = taskController
