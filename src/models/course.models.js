import mongoose from 'mongoose';



const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  coverphoto : String,
  videos: [{ title: String, url: String }], // Assuming each video has a title and URL
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Reference to Teacher model
  // Add any other properties specific to a course
});

const Course = mongoose.model('Course', courseSchema);
export default Course;
