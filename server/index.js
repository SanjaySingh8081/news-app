require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
// We don't need the port for Vercel
// const port = 5000; 

app.use(cors());
app.use(express.json());

const uri = process.env.DATABASE_URL;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.on('error', (error) => {
  console.error("!!! MongoDB Connection Error:", error);
});
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);

// REMOVED app.listen() FOR VERCEL
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// ADD THIS LINE FOR VERCEL
module.exports = app;