import * as express from 'express';
import * as routes from './routes';
import {join} from 'path';
import * as favicon from 'serve-favicon'
import * as logger from 'morgan'
import * as methondOverride from  'method-override'
import * as session from 'express-session'
import * as bodyParser from 'body-parser'
import * as statics from 'serve-static'
import {apiRouter} from './routes/api/index'


const  app = express();
app.set('env',process.env.NODE_ENV||'development')
app.set('port',process.env.PORT || 3001)
app.set('views',join(__dirname,'views'))
app.set('view engine','jade')
app.locals.title ='express'
app.locals.pretty =true
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(logger('dev'))
app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:'secret'
}))
app.use(bodyParser.json())
app.use(bodyParser.json({"limit":"10000kb"}));
app.use(bodyParser.urlencoded({extended:true}))
app.use(methondOverride())
app.use(statics(join(__dirname,'public')))
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  if(req.method=="OPTIONS") res.send(202);/*让options请求快速返回*/
  else  next();
});
app.get('/',routes.index)
app.use('/api',/** authenticateHandler({}), */ apiRouter())

/** 404 */
app.use((req,res,next)=>{
  res.status(404)
  return res.render('404')
})

export default app