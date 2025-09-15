const express = require("express");
const app = express();
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db"); 

require('dotenv').config();
const port = process.env.PORT || 4000;
connectDB();
//...

app.use(morgan("dev"));

// Use the unknownEndpoint middleware for handling undefined routes
app.use(unknownEndpoint);

// Use the errorHandler middleware for handling errors
app.use(errorHandler);

// Middleware to parse JSON
app.use(express.json());
 
// Use the tourRouter for all "/tours" routes
app.use("/api/tours", tourRouter);

// Use the userRouter for all /users routes
app.use("/api/users", userRouter);



// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});
app.use(unknownEndpoint);

app.use(errorHandler);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Example route that throws an error
app.get('/error', (req, res, next) => {
  // Trigger an error
  const error = new Error("Network problem");
  next(error);
});
 