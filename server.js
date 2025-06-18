import express from 'express'
import mongoose from 'mongoose'
import router from './routes/user_route.js'
import postRouter from './routes/post_route.js'
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
dotenv.config()

const port = 5000
const app = express()
// connecting to mongodb
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected successfully')
        app.listen(port, () => {
        console.log('Server is running on port', port)
        })
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err)
    })

//middlewares
app.use(express.json())
app.use(cookieParser())
//running the routes
app.use(router)
app.use(postRouter)