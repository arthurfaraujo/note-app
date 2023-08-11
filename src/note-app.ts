import 'express-async-errors'
import express from 'express'
import noteRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use(cookieParser(process.env.COOKIE_SECRET || 'mySecret'))

server.use('/notes', noteRoutes)

server.use('/user', userRoutes)

server.listen(3000, () => console.log('Server running...'))
