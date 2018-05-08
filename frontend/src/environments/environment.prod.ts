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
         // baseUrl: 'https://dv-social.herokuapp.com/',
        baseUrl: 'http://localhost:3000/'
    },
    github: {
        token: 'token',
        userName: 'danailvidev',
        repoName: 'danailvidev/team-app',
        baseUrl: 'https://api.github.com/search/issues',
        issueUrl: 'https://api.github.com/repos/danailvidev/team-app/issues'
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