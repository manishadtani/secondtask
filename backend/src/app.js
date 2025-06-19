import express from 'express'
const app = express()
import cors from 'cors'
import cookieParser from 'cookie-parser';




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()); 



import authRoute from './routes/auth.route.js'
import taskRoute from './routes/task.route.js'


app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://secondtask-opal.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'Origin', 'X-Access-Token'],
}));







app.use("/api/auth", authRoute)
app.use("/api/tasks", taskRoute)




export default app