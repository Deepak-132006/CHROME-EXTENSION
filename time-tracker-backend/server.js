require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const trackerRoutes = require("./routes/trackerRoutes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api", trackerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
