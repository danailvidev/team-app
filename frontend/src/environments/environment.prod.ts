const packageJson = require('../../package.json');

export const environment = {
    production: true,
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        angularCli: packageJson.devDependencies['@angular/cli'],
        typescript: packageJson.devDependencies['typescript']
    },
    backend: {
        //baseUrl: 'https://dv-social.herokuapp.com',
        'baseUrl': 'http://localhost:3000/',
        'baseAuthUrl': 'http://localhost:3000/auth/'
    },
    logging: [
        {
          loggerName: 'console',
          loggerLocation: '',
          isActive: true
        }, {
          loggerName: 'localStorage',
          loggerLocation: 'logger',
          isActive: false
        }, {
          loggerName: 'webApiDb',
          loggerLocation: 'logs',
          isActive: false
        }
      ]
};
