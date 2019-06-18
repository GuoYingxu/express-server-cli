import { EntityRepository, Repository } from 'typeorm';
import { Example } from '../entity/example';

@EntityRepository(Example)
export class ExampleRepository extends Repository<Example>{

  // 根据name 取数据
  getExample(name:string){
    return this.findOne({name})
  }
}
 