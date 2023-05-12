import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import propertyRoutes from './routes/propertyRoutes.js'
 
const app = express()
const port = process.env.PORT 
const DATABASE_URL = process.env.DATABASE_URL
// mongodb+srv://ahsan:university786@cluster0.mfukdzl.mongodb.net/?retryWrites=true&w=majority

// CORS Policy
app.use(cors())

// Database Connection
connectDB(DATABASE_URL) 

// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/dashboard/property"  , propertyRoutes )

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})