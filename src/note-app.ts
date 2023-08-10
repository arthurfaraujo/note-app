import express from 'express'
import userRoutes from './routes/noteRoutes'

const server = express()

server.use(express.json())

server.use('/notes', userRoutes)

server.listen(3000, () => console.log('Server running...'))
