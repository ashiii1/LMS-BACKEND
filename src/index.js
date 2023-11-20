import dotenv from 'dotenv';
import connectDB from './db/index.js';
import express from 'express';
import cors from 'cors';
import { app } from './app.js';




dotenv.config({
  path : './env'
})

connectDB()
.then(()=>{
  app.listen(process.env.PORT  || 8000 , ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
  })
})
.catch((err)=>{
  console.log("MONGO DB ERROR : !!!" , err);
})

//controlling the student routes
import StudentRoute from './routes/StudentRoute.js';
app.use(StudentRoute);

//controlling the teacher routes
import TeacherRoute from './routes/TeacherRoute.js';
app.use(TeacherRoute);

//controlling the course routes
import CourseRoute from './routes/CourseRoute.js'
app.use(CourseRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});