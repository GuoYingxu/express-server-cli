module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'api.{hostname}.com',
      script    : 'server.ts',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production',
        PORT:3001,
      }
    },

    // Second application
    // {
    //   name      : 'WEB',
    //   script    : 'web.js'
    // }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : '{username}',
      host : '{host}',
      ref  : 'origin/master',
      repo : '{repo}', //git@github.com:GitUserName/projectName.git',
      path : '{host path}',// /var/www/{projectname}/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    },
    staging : {
      user : '{username}',
      host : '{host}',
      ref  : 'origin/develop',
      repo : '{repo}', //git@github.com:GitUserName/projectName.git',
      path : '{host path}',// /var/www/{projectname}/staging',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env staging' ,
      env  : {
        NODE_ENV: 'staging'
      }
    }
  }
};
