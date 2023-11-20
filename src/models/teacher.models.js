import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
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
    highestQualification: {
        type: String,
        required: true // Set the field as required
    },
    createdCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    // Add any other properties specific to a teacher
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
