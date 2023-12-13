const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors'); 

const app = express();
const PORT = process.env.PORT || 4000;
const uri = 'mongodb+srv://tanmay:B5CvYnNeJ1@practice.qwvizgs.mongodb.net/?retryWrites=true&w=majority'
// Connect to MongoDB
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use(cors());

// Use user routes
app.use('/', userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
