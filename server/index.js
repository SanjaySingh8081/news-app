require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

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

// This block checks if the file is being run directly (like with `npm start`)
// or if it's being imported by Vercel.
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;