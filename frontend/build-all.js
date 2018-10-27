const package = require('./package.json');
const { allLocales } = package;
const { exec } = require('child_process');
const args = process.argv.slice(2).join(' ');
const baseHref = 'team-app';

allLocales.forEach(locale => {
  console.log(`RUNNING build for ${locale} with args: ${args}`);
  exec(
    `ng build --aot --base-href=/${baseHref}/${locale}/ ${args} --i18n-file src/locale/messages.${locale}.xlf --i18n-format xlf --i18n-locale ${locale} --output-path dist/${locale}/`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.info(`stdout: ${stdout}`);
    }
  );
});