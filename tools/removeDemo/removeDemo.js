// This script removes demo app files
let rimraf = require('rimraf');
let fs = require('fs');
let chalk = require('chalk');
// let replace = require("replace");
let prompt = require("prompt");
let prompts = require('./removeDemoPrompts');

let chalkSuccess = chalk.green;
let chalkProcessing = chalk.blue;
// let chalkWarn = chalk.red;

/* eslint-disable no-console */

const pathsToRemove = [
  './src/app',
  './src/app/Containers/*',
  './tools/removeDemo.js',

];

const filesToCreate = [
  {
    path: './src/index.js',
    content: '// Set up your application entry point here...'
  },  {
    path: './src/test',
  },

];

function removePath(path, callback) {
  rimraf(path, error => {
    if (error) throw new Error(error);
    callback();
  });
}

function createFile(file) {
  fs.writeFile(file.path, file.content, error => {
    if (error) throw new Error(error);
  });
}


function removePackageJsonScriptEntry(scriptName) {
  const packageJsonPath = './package.json';
  let fileData = fs.readFileSync(packageJsonPath);
  let content = JSON.parse(fileData);
  delete content.scripts[scriptName];
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2) + '\n');
}

console.log(chalkSuccess('Dependencies installed.'));

prompt.start();

console.log(chalkProcessing("WARNING: You could lose your data"));
prompt.get([{
  name: 'redux',
  description: "Redux ? [Y/n]"
}, {
  name: 'storybook',
  description: "Storybook ? [Y/n]"
}, {
  name: 'unitTests',
  description: "Unit-test ? [Y/n]"
}, {
  name: 'e2e',
  description: "E2E-test ? [Y/n]"
}, {
  name: 'removeDemo',
  description: "Would you like to remove demo ? [Y/n]"
}
], function (err, result) {
  let redux = result.redux.toUpperCase();
  let removeDemo = result.removeDemo.toUpperCase();
  console.log(redux)
  if (err) {
    process.exit(1);
  }
  if (removeDemo.match(/^N.*/)) {
    console.log(removeDemo);
    console.log(removeDemo.match(/^N.*/))
  } else {
    let numPathsRemoved = 0;
    pathsToRemove.map(path => {
      removePath(path, () => {
        numPathsRemoved++;
        if (numPathsRemoved === pathsToRemove.length) {
          filesToCreate.map(file => createFile(file));
        }
      });
    });
    console.log(chalkSuccess('Demo app removed.'));
  }
  removePackageJsonScriptEntry('remove-demo');
  console.log(chalkSuccess('Setup completed. Happy Hacking'));
});
