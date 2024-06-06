

import  express from 'express';
import mongoose from 'mongoose';
import moviesRouter  from "./controller/movieController.js";
import dotenv  from 'dotenv';
// get config vars
dotenv.config();
console.log(process.env.PORT)
const PORT=process.env.PORT||4000
const uri=process.env.URI


// module.exports = app => {
mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('MongoDB Atlas connection error:', error);
});
const app=express()

app.use(express.json())

app.use('/movies', moviesRouter);

app.listen(PORT,()=>{
  console.log("hello")
})

export default app;