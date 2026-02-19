const express = require("express");
const cors = require("cors");
const santaRoutes = require("./routes/santa.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Secret Santa Server is running" });
});

app.use("/api/santa", santaRoutes);

app.use(errorMiddleware);

module.exports = app;
