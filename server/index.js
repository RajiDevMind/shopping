require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/connect");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

const port = process.env.PORT || 2000;

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:2000"],
    credentials: true,
  })
);

// error middleware
app.use(errorHandler());

app.get("/", (req, res) => {
  res.send("<h1>Hello World!!!</h1>");
});
app.use("/auth/users/", userRoutes);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      port,
      console.log(`Server is listening on http://localhost:${port}`)
    );
  } catch (err) {
    if (err.hostname === "_mongodb._tcp.shopcluster.hww8vud.mongodb.net") {
      console.log("Unable to connect! check ur internet connection");
    } else {
      console.log("Unexpected error", err);
    }
  }
};
start();
