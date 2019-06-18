import {Router} from 'express';
import {exampleRouter} from './example';
let router = new Router()
export function apiRouter(){
  router.use('/example',exampleRouter())
  return router
}