// // src/routes/studentRoutes.js
// import { Router } from 'express';
// import Student from '../models/student.models.js';
// import Course from '../models/course.models.js';  // Make sure to import the Course model

// const router = Router();

// router.post('/student_add', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;

//         const newStudent = await Student.create({
//             username,
//             email,
//             password,
//         });

//         res.status(201).json(newStudent);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/getallstudent', async (req, res) => {
//     try {
//         const showAll = await Student.find();
//         res.status(200).json(showAll);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//         return;
//     }
// });

// // Student login route
// router.post('/student_login', async (req, res) => {
//     try {
//       const { email, password } = req.body;
  
//       // Find the student by email
//       const student = await Student.findOne({ email });
  
//       // Check if the student exists and the password is correct
//       if (student && student.password === password) {
//         res.status(200).json({ success: true, message: 'Login successful', student });
//       } else {
//         res.status(401).json({ success: false, error: 'Invalid email or password' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });

//   // src/routes/studentRoutes.js

// router.get('/getStudentData/:studentId', async (req, res) => {
//     try {
//       const { studentId } = req.params;
//       const student = await Student.findById(studentId);
  
//       if (!student) {
//         return res.status(404).json({ error: 'Student not found' });
//       }
  
//       res.status(200).json(student);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Enroll student in a course
// router.post('/enroll-course/:studentId/:courseId', async (req, res) => {
//     try {
//       const { studentId, courseId } = req.params;
  
//       // Find the student and course
//       const student = await Student.findById(studentId);
//       const course = await Course.findById(courseId);
  
//       if (!student || !course) {
//         return res.status(404).json({ success: false, error: 'Student or course not found' });
//       }
  
//       // Check if the student is already enrolled in the course
//       if (student.enrolledCourses.includes(courseId)) {
//         return res.status(400).json({ success: false, error: 'Student is already enrolled in the course' });
//       }
  
//       // Enroll the student in the course
//       student.enrolledCourses.push(courseId);
//       await student.save();
  
//       res.status(200).json({ success: true, message: 'Enrollment successful' });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });

//   //get the courses by student id
//   router.get('/enrolled-courses/:studentId', async (req, res) => {
//     try {
//       const studentId = req.params.studentId;
  
//       // Find the student by ID
//       const student = await Student.findById(studentId);
  
//       if (!student) {
//         return res.status(404).json({ success: false, error: 'Student not found' });
//       }
  
//       // Fetch the enrolled courses
//       const enrolledCourses = await Course.find({ _id: { $in: student.enrolledCourses } });
  
//       res.status(200).json(enrolledCourses);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, error: error.message });
//     }
//   });

//   // Delete enrolled course from student
// router.delete('/delete-enrolled-course/:studentId/:courseId', async (req, res) => {
//   const { studentId, courseId } = req.params;

//   try {
//     // Find the student by ID
//     const student = await Student.findById(studentId);

//     // Check if the student and enrolledCourses array exist
//     if (!student || !student.enrolledCourses) {
//       return res.status(404).json({ error: 'Student not found or no enrolled courses' });
//     }

//     // Remove the course from the enrolledCourses array
//     const index = student.enrolledCourses.indexOf(courseId);
//     if (index !== -1) {
//       student.enrolledCourses.splice(index, 1);
//     } else {
//       return res.status(404).json({ error: 'Course not found in the enrolled courses list' });
//     }

//     // Save the updated student data
//     await student.save();

//     res.json({ success: true, message: 'Course deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting enrolled course', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
  


// export default router;

import { Router } from 'express';
import Student from '../models/student.models.js';
import Course from '../models/course.models.js';  // Make sure to import the Course model

const router = Router();

router.post('/student_add', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newStudent = await Student.create({
            username,
            email,
            password,
        });

        res.status(201).json(newStudent);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/getallstudent', async (req, res) => {
    try {
        const showAll = await Student.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
        return;
    }
});

// Student login route
router.post('/student_login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the student by email
        const student = await Student.findOne({ email });

        // Check if the student exists and the password is correct
        if (student && student.password === password) {
            res.status(200).json({ success: true, message: 'Login successful', student });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get student data by ID
router.get('/getStudentData/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// Enroll student in a course
router.post('/enroll-course/:studentId/:courseId', async (req, res) => {
    try {
        const { studentId, courseId } = req.params;

        // Find the student and course
        const student = await Student.findById(studentId);
        const course = await Course.findById(courseId);

        if (!student || !course) {
            return res.status(404).json({ success: false, error: 'Student or course not found' });
        }

        // Check if the student is already enrolled in the course
        if (student.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ success: false, error: 'Student is already enrolled in the course' });
        }

        // Enroll the student in the course
        student.enrolledCourses.push(courseId);
        await student.save();

        res.status(200).json({ success: true, message: 'Enrollment successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get enrolled courses by student ID
router.get('/enrolled-courses/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId;

        // Find the student by ID
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({ success: false, error: 'Student not found' });
        }

        // Fetch the enrolled courses
        const enrolledCourses = await Course.find({ _id: { $in: student.enrolledCourses } });

        res.status(200).json(enrolledCourses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Delete enrolled course from student
router.delete('/delete-enrolled-course/:studentId/:courseId', async (req, res) => {
    const { studentId, courseId } = req.params;

    try {
        // Find the student by ID
        const student = await Student.findById(studentId);

        // Check if the student and enrolledCourses array exist
        if (!student || !student.enrolledCourses) {
            return res.status(404).json({ error: 'Student not found or no enrolled courses' });
        }

        // Remove the course from the enrolledCourses array
        const index = student.enrolledCourses.indexOf(courseId);
        if (index !== -1) {
            student.enrolledCourses.splice(index, 1);
        } else {
            return res.status(404).json({ error: 'Course not found in the enrolled courses list' });
        }

        // Save the updated student data
        await student.save();

        res.json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting enrolled course', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a specific video from a course
router.delete('/deleteVideo/:courseId/:videoId', async (req, res) => {
    try {
        const { courseId, videoId } = req.params;

        // Find the course by ID
        const course = await Course.findById(courseId);

        // Check if the course exists
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Filter out the video with the given videoId
        course.videos = course.videos.filter(video => video.id !== videoId);
        await course.save();

        res.status(200).json({ message: 'Video deleted successfully from course.' });
    } catch (error) {
        console.error('Error deleting video from course', error);
        res.status(500).json({ error: error.message });
    }
});

// Delete a video from the "see videos" page
router.delete('/deleteSeeVideo/:videoId', async (req, res) => {
    try {
        const { videoId } = req.params;

        // Find and delete the video from the database
        const result = await Course.updateMany(
            { 'videos.id': videoId },
            { $pull: { videos: { id: videoId } } }
        );

        if (result.nModified > 0) {
            res.status(200).json({ message: 'Video deleted successfully from see videos.' });
        } else {
            res.status(404).json({ error: 'Video not found' });
        }
    } catch (error) {
        console.error('Error deleting video from see videos', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
