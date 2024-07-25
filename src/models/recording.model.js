// src/models/recording.models.js
import mongoose from 'mongoose';

export const recordingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
});

const Recording = mongoose.model('Recording', recordingSchema);

export default Recording;
