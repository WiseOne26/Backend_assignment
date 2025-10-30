import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import middlewares from "./middlewares/errorHandler.js";
import errorHandling from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

//Middlewares
app.use(express.json())
app.use(cors());

//Routes
app.use("/api", userRoutes);

//Error handling middleware
app.use(errorHandling)

// Testing POSTGRES Connection
app.get("/", async(req, res)=>{
    const result = await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The database name is : ${result.rows[0].current_database}`);
});

app.listen(port,()=>{
    console.log(`Server is running on http:localhost:${port}`);
});