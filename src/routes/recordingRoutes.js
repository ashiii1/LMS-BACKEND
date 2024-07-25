// src/routes/recordingRoutes.js
import { Router } from 'express';
import Recording from '../models/recording.model.js';
import Teacher from '../models/teacher.models.js';

const router = Router();

// Route to add a recording
router.post('/addRecording/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { name, description, url } = req.body;

    // Validate input data
    if (!name || !description || !url) {
      return res.status(400).json({ error: 'Name, description, and URL are required' });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Create a new recording
    const newRecording = await Recording.create({
      name,
      description,
      url,
      teacherId
    });

    res.status(201).json(newRecording);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to get all recordings
router.get('/getRecordings', async (req, res) => {
  try {
    const recordings = await Recording.find();
    res.status(200).json(recordings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
