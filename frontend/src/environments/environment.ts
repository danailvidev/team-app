// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const packageJson = require('../../package.json');

export const environment = {
    production: false,
    versions: {
        app: packageJson.version,
        angular: packageJson.dependencies['@angular/core'],
        angularCli: packageJson.devDependencies['@angular/cli'],
        typescript: packageJson.devDependencies['typescript']
    },
    backend: {
        'baseUrl': 'http://localhost:3000/'
    },
    github: {
        token: 'token',
        userName: 'danailvidev',
        repoName: 'danailvidev/team-app',
        baseUrl: 'https://api.github.com/search/issues',
        issueUrl: 'https://api.github.com/repos/danailvidev/team-app/issues'
    }
    ,
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

