import express, { Express, Router } from "express";
import dotenv from "dotenv";
import router from "./routes/employee";
import { errorHandler } from "./utils/employee";
import "reflect-metadata"

const cors = require('cors')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
