import express from "express";
import mongoose from "mongoose";
import eventRoutes from "./routes/eventRoutes.js"; 
import userRoutes from "./routes/userRoutes.js"; 


const PORT = 3000;
const app = express();

// Middleware
app.use(express.json());


// MongoDB Connection
mongoose
    // .connect("mongodb://127.0.0.1:27017/calendar_base")
    .connect("mongodb://192.168.1.155:27017/calendar_base")
    .then(() => console.log("MongoDB connection established"))
    .catch((error) => console.log(error.message));


// Routes
app.use("/event", eventRoutes)
app.use("/", userRoutes)


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
