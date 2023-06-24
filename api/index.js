const server = require('./src/app.js')

const port = 8000

const {conn} = require('./src/db.js')

conn.sync({ force: false })
.then(()=>{
    server.listen(port,()=>{
        console.log('listening on port', port) 
    })
})
.catch(err=> console.log("ACA ESTA EL PUTO ERROR", err))
