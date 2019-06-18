import { Router } from 'express';
import { getManager } from 'typeorm';
import {Example} from '../../entity/example';
let router = new Router()
export function exampleRouter (){
  router.route('/example')
    .get((req ,res, next)=>{
      const entitymanager = getManager()
      const exam =  entitymanager.findOne(Example).then(exam=>{
        return res.json(exam)
      }).catch(err=>{
        return res.status(400).json(err)
      })
    })
    .post( async (req,res,next)=>{
      let examEntity = new Example()
      examEntity.name='test'
     let savedEntity =  await getManager().save(examEntity)
     return res.json({success:true,entity: savedEntity})
    })
  return router
}