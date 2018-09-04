let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId
let schemaName = 'Task'
let commentSchema = new Schema({
    authorId: { type: ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() }
})

let schema = new Schema({
    title: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() },
    boardId: { type: ObjectId, ref: 'Board', required: true },
    authorId: { type: ObjectId, ref: 'User', required: true },
    listId: { type: ObjectId, ref: 'List', required: true },
    description: { type: String, required: true },
    comments: [commentSchema]
})


module.exports = mongoose.model(schemaName, schema)