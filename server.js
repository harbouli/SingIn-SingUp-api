const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

// get Routers 
const blogsRoutes = require('./routes/blog')
const authRouther = require('./routes/auth')




// app
const app  = express();

// db
mongoose.connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
      })
      .then(()=> console.log("Database Connected"));

// middlewares

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes Middlewares 

app.use('/api',blogsRoutes)
app.use('/api',authRouther)


 //Cors
if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: process.env.CLIENT_URL}))

}
 // routes







 const port = process.env.PORT || 8000
 app.listen(port , () => {

    console.log('You r in Port '+ port )
 })