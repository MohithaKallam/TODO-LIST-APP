
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'pending' }, // pending/completed
  priority: { type: String, default: 'normal' },
  dueDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 👈 linked user
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
export default Task;
