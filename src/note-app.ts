import 'express-async-errors'
import express from 'express'
import noteRoutes from './routes/noteRoutes'
import userRoutes from './routes/userRoutes'
import appRoutes from './routes/appRoutes'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

const server = express()

server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser(process.env.COOKIE_SECRET || 'mySecret'))
server.use(express.static('public'))
server.set('view engine', 'ejs')
server.set('views', 'src/views')

server.use('/', appRoutes)
server.use('/notes', noteRoutes)
server.use('/user', userRoutes)

server.listen(3000, () => console.log('Server running...'))
