const express = require('express')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieaParser = require('cookie-parser')

const errorMiddleware = require('./middleware/error')

//config
if (process.env.NODE_ENV !== 'PRODUCTION') {

    require('dotenv').config({ path: './config.env' })
}


app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieaParser())

app.use(cors({
    credentials: true,
    origin: [process.env.APP_URL, 'http://localhost:5173' , 'http://192.168.100.6:5173','https://fyp-demo.vercel.app']
}))


// import routes
const user = require('./routes/userRoute')
const product = require('./routes/productRoute')


app.use('/api', user)
app.use('/api', product)


// Middleware for errors
app.use(errorMiddleware)

module.exports = app
