import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true, min: 1 },
    id: { type: Number, required: true, min: 1, unique: true }
});

export default mongoose.model('client', ClientSchema);
