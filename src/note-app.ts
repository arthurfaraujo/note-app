import 'express-async-errors'
import express from 'express'
import noteRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import morgan from 'morgan'

const server = express()
server.use(morgan('dev'))

server.use(express.json())

server.use('/notes', noteRoutes)

server.use('/user', userRoutes)

server.listen(3000, () => console.log('Server running...'))
