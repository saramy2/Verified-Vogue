const app = require('./app')
const ConnectDatabase = require('./config/dataBase')

//Handling uncaught exception
process.on('uncaughtException',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to uncaught exception')
    process.exit(1)
})

//config
if(process.env.NODE_ENV !== 'PRODUCTION'){

    require('dotenv').config({path : './config.env'})
}

//connecting to database
ConnectDatabase()



const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server is listening on port http://localhost:${process.env.PORT}`)
})


//Unhandled Promise rejection
process.on('unhandledRejection',(err)=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to unhandled promise rejection')

    server.close(()=>{
        process.exit(1)
    })
})


