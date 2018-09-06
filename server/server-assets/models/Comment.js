let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Comment'

let schema = new Schema({
  authorId: { type: ObjectId, ref: 'User', required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  description: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  userName: { type: String, required: true }
})

module.exports = mongoose.model(schemaName, schema)