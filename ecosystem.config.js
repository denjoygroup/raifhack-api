module.exports = {
  apps : [{
    name      : 'faifhack-api',
    // instances : "2",
    script    : 'npm',
    args: 'run start:prod',
    log_file: "/root/.pm2/logs/faifhack-api-combined.log",
    out_file: "/root/.pm2/logs/faifhack-api-out.log",
    error_file: "/root/.pm2/logs/faifhack-api-error.log",
    merge_logs: true,
    log_date_format : "YYYY-MM-DD HH:mm:ss",
  }],

  // deploy : {
  //   production : {
  //     user : 'node',
  //     host : '212.83.163.1',
  //     ref  : 'origin/master',
  //     repo : 'git@github.com:repo.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};