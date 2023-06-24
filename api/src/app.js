const express = require('express')
const app =  express()
const cors = require('cors')
const morgan = require('morgan')
const cookieparser = require('cookie-parser')
const bodyParser = require('body-parser')
const handlers = require('../utils/errors/handlers')

require('./db.js')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json())
app.use(cors(corsOptions))
app.use(cookieparser())
app.use(morgan('dev'))
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/characters', require('./routes/Characters'))
app.use('/episode', require('./routes/Episode'))

app.use('*', handlers.notFoundHandler)
app.use(handlers.errorHandler)


module.exports = app;