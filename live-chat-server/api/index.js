// const express = require("express");
// const dotenv = require("dotenv");
// const { default: mongoose } = require("mongoose");
// const app = express();
// const cors = require("cors");
// const { notFound, errorHandler } = require("../middleware/errorMiddleware");

// app.use(
//   cors({
//     origin: "*",
//   })
// );
// dotenv.config();

// app.use(express.json());

// const userRoutes = require("../Routes/userRoutes");
// const chatRoutes = require("../Routes/chatRoutes");
// const messageRoutes = require("../Routes/messageRoutes");

// const connectDb = async () => {
//   try {
//     const connect = await mongoose.connect(process.env.MONGODB_URI);
//     console.log("Server is Connected to Database");
//   } catch (err) {
//     console.log("Server is NOT connected to Database", err.message);
//   }
// };
// connectDb();

// app.get("/", (req, res) => {
//   res.send("API is running123");
// });

// app.use("/user", userRoutes);
// app.use("/chat", chatRoutes);
// app.use("/message", messageRoutes);

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, console.log("Server is Running..."));

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const { notFound, errorHandler } = require("../middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

const userRoutes = require("../Routes/userRoutes");
const chatRoutes = require("../Routes/chatRoutes");
const messageRoutes = require("../Routes/messageRoutes");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Server is Connected to Database");
  } catch (err) {
    console.log("Server is NOT connected to Database", err.message);
    process.exit(1); // Exit the process if the database connection fails
  }
};
connectDb();

app.get("/", (req, res) => {
  res.send("API is running123");
});

app.use("/user", userRoutes);
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));

module.exports = app;
