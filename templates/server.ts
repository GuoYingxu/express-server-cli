/**
 * @author {author}
 * 
 * @description  start a http server 
 */
import app from './app'
import * as  http from 'http'
import { createConnection } from 'typeorm';
const server = http.createServer(app)
createConnection().then(connection=>{
  server.listen(app.get('port'),()=>{
    console.log('Express server listenning on port:', app.get('port'))
  })
}).catch(error=>{
  console.log('ERROR:',error)
})
