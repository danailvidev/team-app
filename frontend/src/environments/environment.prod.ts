const packageJson = require('../../package.json');

export const environment = {
  production: true,
  baseUrl: 'https://dv-social.herokuapp.com',
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript']
  }
};
