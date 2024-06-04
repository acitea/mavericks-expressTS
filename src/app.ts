import express from "express";
import dotenv from "dotenv";
import router from "./routes/employee";
import authentication from "./routes/authentication";
import { errorHandler, authenticateToken } from "./utils/express";
import "reflect-metadata"
import { db } from "./dataSource";

const cors = require('cors')
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.use('/', authentication)
app.use(authenticateToken)
app.use('/', router)
app.use(errorHandler)

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, async () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
        await db.initialize()
    });
}


export default app