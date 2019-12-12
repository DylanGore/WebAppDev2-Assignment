import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    project: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    due: { type: Date, required: true, default: Date.now() },
    state: { type: String, required: true },
    id: { type: Number, required: true, min: 1, unique: true }
});

module.exports = mongoose.model('task', TaskSchema);
