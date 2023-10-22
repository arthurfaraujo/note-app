import 'express-async-errors'
import express from 'express'
import noteRoutes from './routes/noteRoutes'
import categoryRoutes from './routes/categoryRoutes'
import userRoutes from './routes/userRoutes'
import appRoutes from './routes/appRoutes'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import ErrorHandlers from './middlewares/error'
import 'dotenv/config'

const server = express()
const PORT: number = Number(process.env.SERVER_PORT) || 3000

server.use(morgan('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser(process.env.SERVER_SECRET || 'IIBh&yiuy230hJJHG9yas'))
server.use(express.static('public'))
server.set('view engine', 'ejs')
server.set('views', 'src/views')

server.use('/categories', categoryRoutes)
server.use('/notes', noteRoutes)
server.use('/user', userRoutes)
server.use('/', appRoutes)
server.use(ErrorHandlers.pageNotFound, ErrorHandlers.otherErrors)

server.listen(PORT, '0.0.0.0', () =>
  console.log('Server running on port ' + PORT + '...')
)
