import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    type: { type: String, required: true },
    client: { type: Number, required: true, min: 1 },
    description: { type: String, required: true },
    due: { type: Date, required: true, default: Date.now() },
    id: { type: String, required: true, unique: true }
});

export default mongoose.model('project', ProjectSchema);
