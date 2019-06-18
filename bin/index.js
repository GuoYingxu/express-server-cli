#!/usr/bin/env node

const {compileFile} =require('./util')
const inquirer = require('inquirer')
var program = require('commander');
const questions = [
  {
    type : "input",
    name : "language",
    message : " 选择语言： ts for typescript  or js for javascript (default : ts)"
  }
]
program.version('0.0.1')
program.command('init <name>')
       .alias('i')
       .description('初始化')
       .action((name)=>{
         inquirer.prompt(questions).then(answer=>{
          compileFile(name,answer.language || 'ts')
         })
        //  compileFile(name,option.type)
       })

program.parse(process.argv)
