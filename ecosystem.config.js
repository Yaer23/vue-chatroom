module.exports = {
  apps : [
    {
      name      : 'vue-chatroom',
      script    : 'server/app.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    }
  ],
  deploy : {
    production : {
      user : 'Lydia',
      host : '132.232.124.245',
      ref  : 'origin/master',
      repo : 'git@github.com:Yaer23/vue-chatroom.git',
      path : '/www/vue-chatroom',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production'
    }
  }
};
