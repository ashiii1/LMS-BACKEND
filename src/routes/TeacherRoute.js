// // src/routes/studentRoutes.js
// import { Router } from 'express';
// import Teacher from '../models/teacher.models.js';
// import Course from '../models/course.models.js'; // Import Course model

// const router = Router();

// router.post('/teacher_add', async (req, res) => {
//     try {
//         const { username, email, password ,highestQualification} = req.body;

//         const newTeacher = await Teacher.create({
//             username,
//             email,
//             password,
//             highestQualification
//         });

//         res.status(201).json(newTeacher);
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error.message });
//     }
// });

// router.get('/getallteacher', async (req, res) => {
//     try {
//         const showAll = await Teacher.find();
//         res.status(200).json(showAll);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//         return;
//     }
// });

// // Teacher login route
// router.post('/teacher_login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the teacher by email
//         const teacher = await Teacher.findOne({ email });

//         // Check if the teacher exists and the password is correct
//         if (teacher && teacher.password === password) {
//             // Send teacherId along with success response
//             res.status(200).json({ success: true, message: 'Login successful', teacherId: teacher._id });
//         } else {
//             res.status(401).json({ success: false, error: 'Invalid email or password' });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// //teacher name 
// // Route to get teacher name by ID
// // Inside your backend teacher routes
// // Route to get teacher name and courses by ID
// router.get('/getTeacherData/:teacherId', async (req, res) => {
//     try {
//       const { teacherId } = req.params;
  
//       // Find the teacher by ID and populate the createdCourses field with course details
//       const teacher = await Teacher.findById(teacherId).populate('createdCourses');
  
//       // Check if the teacher exists
//       if (!teacher) {
//         return res.status(404).json({ error: 'Teacher not found' });
//       }
  
//       // Extract relevant information
//       const teacherData = {
//         name: teacher.username,
//         courses: teacher.createdCourses.map(course => ({
//           id: course._id,
//           title: course.title,
//           description: course.description,
//           coverphoto: course.coverphoto,
//         })),
//       };
  
//       // Send the teacher data in the response
//       res.status(200).json(teacherData);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: error.message });
//     }
//   });

//   // Route to delete a course by teacherId and courseId
//   router.delete('/deleteCourse/:teacherId/:courseId', async (req, res) => {
//     try {
//         const { teacherId, courseId } = req.params;

//         // Find the teacher by ID
//         const teacher = await Teacher.findById(teacherId);

//         // Check if the teacher exists
//         if (!teacher) {
//             return res.status(404).json({ error: 'Teacher not found' });
//         }

//         // Check if the course exists in the createdCourses array
//         const courseIndex = teacher.createdCourses.indexOf(courseId);
//         if (courseIndex !== -1) {
//             teacher.createdCourses.splice(courseIndex, 1); // Remove the course ID from the array
//             await teacher.save();

//             // Delete the course document from the Course model
//             await Course.deleteOne({ _id: courseId });

//             res.status(200).json({ message: "Course deleted successfully." });
//         } else {
//             res.status(404).json({ message: "Course not found." });
//         }
//     } catch (error) {
//         console.error("Error deleting course", error);
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;
// src/routes/studentRoutes.js
import { Router } from 'express';
import Teacher from '../models/teacher.models.js';
import Course from '../models/course.models.js'; // Import Course model

const router = Router();

router.post('/teacher_add', async (req, res) => {
    try {
        const { username, email, password ,highestQualification} = req.body;

        const newTeacher = await Teacher.create({
            username,
            email,
            password,
            highestQualification
        });

        res.status(201).json(newTeacher);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.get('/getallteacher', async (req, res) => {
    try {
        const showAll = await Teacher.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
        return;
    }
});


// Teacher login route
router.post('/teacher_login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the teacher by email
        const teacher = await Teacher.findOne({ email });

        // Check if the teacher exists and the password is correct
        if (teacher && teacher.password === password) {
            // Send teacherId along with success response
            res.status(200).json({ success: true, message: 'Login successful', teacherId: teacher._id });
        } else {
            res.status(401).json({ success: false, error: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

//teacher name 
// Route to get teacher name by ID
// Inside your backend teacher routes
// Route to get teacher name and courses by ID
router.get('/getTeacherData/:teacherId', async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      // Find the teacher by ID and populate the createdCourses field with course details
      const teacher = await Teacher.findById(teacherId).populate('createdCourses');
  
      // Check if the teacher exists
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Extract relevant information
      const teacherData = {
        name: teacher.username,
        courses: teacher.createdCourses.map(course => ({
          id: course._id,
          title: course.title,
          description: course.description,
          coverphoto: course.coverphoto,
        })),
      };
  
      // Send the teacher data in the response
      res.status(200).json(teacherData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete a course by teacherId and courseId
  router.delete('/deleteCourse/:teacherId/:courseId', async (req, res) => {
    try {
        const { teacherId, courseId } = req.params;

        // Find the teacher by ID
        const teacher = await Teacher.findById(teacherId);

        // Check if the teacher exists
        if (!teacher) {
            return res.status(404).json({ error: 'Teacher not found' });
        }

        // Check if the course exists in the createdCourses array
        const courseIndex = teacher.createdCourses.indexOf(courseId);
        if (courseIndex !== -1) {
            teacher.createdCourses.splice(courseIndex, 1); // Remove the course ID from the array
            await teacher.save();

            // Delete the course document from the Course model
            await Course.deleteOne({ _id: courseId });

            res.status(200).json({ message: "Course deleted successfully." });
        } else {
            res.status(404).json({ message: "Course not found." });
        }
    } catch (error) {
        console.error("Error deleting course", error);
        res.status(500).json({ error: error.message });
    }
});



// Teacher deletes a video from a specific course
router.delete('/delete-course-video/:courseId/:videoId', async (req, res) => {
    const { courseId, videoId } = req.params;

    try {
        // Find the course by ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Check if the video exists in the course
        const videoIndex = course.videos.findIndex(video => video.id === videoId);
        if (videoIndex === -1) {
            return res.status(404).json({ error: 'Video not found in the course' });
        }

        // Remove the video from the course
        course.videos.splice(videoIndex, 1);
        await course.save();

        // Remove the video from all students' enrolled courses
        await Student.updateMany(
            { enrolledCourses: courseId },
            { $pull: { 'videos': { id: videoId } } }
        );

        res.status(200).json({ message: 'Video deleted successfully from course and students' });
    } catch (error) {
        console.error('Error deleting video from course', error);
        res.status(500).json({ error: error.message });
    }
})
export default router;
