// student.models.j
import mongoose from 'mongoose';
const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
    // Add any other properties specific to a student
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
