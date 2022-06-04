require("dotenv").config();

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");


const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth/authRoutes");
const userRoutes = require("./routes/user/userRoutes");
const connectDB = require("./config/db");



connectDB();

const app = express();
app.use(
  cookieSession({
    name: "leaf-now-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
