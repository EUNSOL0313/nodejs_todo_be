const Task = require('../model/Task')

const taskController = {}

taskController.createTask = async (req, res) => {
   try {
      const { task, isComplete } = req.body

      const { userId } = req
      //const newTask = new Task({ task, isComplete})

      //미들웨어 사용으로 auth 가져오기
      const newTask = new Task({ task, isComplete, author: userId })
      await newTask.save()
      res.status(200).json({ status: 'ok', data: newTask })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

taskController.getTask = async (req, res) => {
   try {
      const tasklist = await Task.find({}).populate('author').select('-__v')
      console.log('ttt', tasklist)
      res.status(200).json({ status: 'ok', data: tasklist })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

taskController.updateTask = async (req, res) => {
   try {
      const task = await Task.findById(req.params.id)
      if (!task) {
         throw new Error('App can not find the task')
      }
      const fields = Object.keys(req.body)
      fields.map((item) => (task[item] = req.body[item]))
      await task.save()
      res.status(200).json({ status: 'ok', data: task })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

taskController.deleteTask = async (req, res) => {
   try {
      const deleteItem = await Task.findByIdAndDelete(req.params.id)
      res.status(200).json({ status: 'ok', data: deleteItem })
   } catch (error) {
      res.status(400).json({ status: 'fail', error })
   }
}

module.exports = taskController
