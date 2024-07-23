const express = require("express");
const cors = require("cors");
const copyEvent = require("./controllers/copy-event");
const pasteEvent = require("./controllers/paste-event");
const getCredentials = require("./controllers/get-credentials");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};
connectDB();
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors(
  {
    origin: "http://localhost:1420",
    methods: "GET,POST",
  }
));

app.use("/api/copy-event", copyEvent);
app.use("/api/paste-event", pasteEvent);
app.use("/api/get-credentials", getCredentials);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
