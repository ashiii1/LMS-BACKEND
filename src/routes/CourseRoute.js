// import { Router } from 'express';
// import Course from '../models/course.models.js';
// import Teacher from '../models/teacher.models.js';

// const router = Router();

// router.post('/create-course/:teacherId', async (req, res) => {
//   try {
//     const { teacherId } = req.params;
//     const { title, description, coverphoto} = req.body; // Updated from 'thumbnail' to 'coverphoto'

//     // Validate input data
//     if (!title || !description) {
//       return res.status(400).json({ error: 'Title and description are required' });
//     }

//     // Check if the teacher exists
//     const teacher = await Teacher.findById(teacherId);
//     if (!teacher) {
//       return res.status(404).json({ error: 'Teacher not found' });
//     }

//     // Add the teacherId to the course data
//     const newCourse = await Course.create({
//       title,
//       description,
//       coverphoto, // Updated from 'thumbnail' to 'coverphoto'
//       teacher: teacherId,
//     });

//     // Update the teacher model with the new course
//     await Teacher.findByIdAndUpdate(teacherId, {
//       $push: { createdCourses: newCourse._id },
//     });

//     res.status(201).json(newCourse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });


// // Route to get course details
// router.get('/getCourseDetails/:courseId', async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const courseDetails = await Course.findById(courseId);
//     res.status(200).json(courseDetails);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Route to add video details to a course
// router.post('/addVideo/:courseId', async (req, res) => {
//   try {
//     const { courseId } = req.params;
//     const { title, url } = req.body;

//     // Validate input data
//     if (!title || !url) {
//       return res.status(400).json({ error: 'Title and URL are required for the video' });
//     }

//     // Find the course by courseId and update the videos array
//     const updatedCourse = await Course.findByIdAndUpdate(
//       courseId,
//       { $push: { videos: { title, url } } },
//       { new: true }
//     );

//     res.status(200).json(updatedCourse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });


// router.get('/getallcourses', async (req, res) => {
//   try {
//     const showAll = await Course.find();
//     res.status(200).json(showAll);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
import { Router } from 'express';
import Course from '../models/course.models.js';
import Teacher from '../models/teacher.models.js';

const router = Router();

router.post('/create-course/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { title, description, coverphoto} = req.body; // Updated from 'thumbnail' to 'coverphoto'

    // Validate input data
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Add the teacherId to the course data
    const newCourse = await Course.create({
      title,
      description,
      coverphoto, // Updated from 'thumbnail' to 'coverphoto'
      teacher: teacherId,
    });

    // Update the teacher model with the new course
    await Teacher.findByIdAndUpdate(teacherId, {
      $push: { createdCourses: newCourse._id },
    });

    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


// Route to get course details
router.get('/getCourseDetails/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const courseDetails = await Course.findById(courseId);
    res.status(200).json(courseDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Route to add video details to a course
router.post('/addVideo/:courseId', async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, url } = req.body;

    // Validate input data
    if (!title || !url) {
      return res.status(400).json({ error: 'Title and URL are required for the video' });
    }

    // Find the course by courseId and update the videos array
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { videos: { title, url } } },
      { new: true }
    );

    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


router.get('/getallcourses', async (req, res) => {
  try {
    const showAll = await Course.find();
    res.status(200).json(showAll);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
