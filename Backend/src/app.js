import express from 'express';
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"


const app = express();

// Middleware to parse JSON bodies
    
app.use(express.json())
app.use(cookieParser())

app.use('/auth',authRoutes)

export default app;