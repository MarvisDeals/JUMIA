const dotenv = require("dotenv");
const express = require("express");

dotenv.config();
const app = express();

app.use(express.json());
const connectDB = require("./configs/database");
connectDB();
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

const fakeStoreApiRoutes = require("./routes/fakeStoreApiRoutes");
app.use("/api/fakestore", fakeStoreApiRoutes);





const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});