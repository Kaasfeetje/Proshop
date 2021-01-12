import express from "express";
import colors from "colors";
import dotenv from "dotenv";

import { notFound, errorHandler } from "./middleware/errorMiddleware";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

connectDB();

const app = express();

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Listening on port ${PORT} in ${process.env.NODE_ENV}`.yellow.bold
    );
});
