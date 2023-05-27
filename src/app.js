import express from 'express'
import jwtRouter from './routers/jwt.routes.js'
import cookieParser from 'cookie-parser'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(express.static('./src/public'))

app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log('Server Up'))
