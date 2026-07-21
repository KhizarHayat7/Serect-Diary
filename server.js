import express from 'express'
import authRouter from './Routers/auth.js'
import path from "node:path";
import session from 'express-session'
import chapterRoutes from './Routers/dairy.js'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT
const Serect = process.env.SESSION_KEY

const app = express()

app.use(express.json())

app.use(express.static(path.join(process.cwd(), 'Public')))

app.use(session({
    secret: Serect,
    resave: false,
    saveUninitialized: true,
    cookie: {
         httpOnly: false,
         secure: false,
         sameSite: 'lax'
    } 
}))

app.use("/api/auth",authRouter)

app.use("/api/dairy",chapterRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT} .`)
})