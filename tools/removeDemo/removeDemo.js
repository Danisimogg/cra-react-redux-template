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
  './src/app/Components',
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

console.log(chalkProcessing("WARNING: "));
prompt.get([{
  name: 'deleteGit',
  description: "  [Y/n]"
}], function (err, result) {
  let deleteGit = result.deleteGit.toUpperCase();

  if (err) {
    process.exit(1);
  }
  if (deleteGit.match(/^N.*/)) {
    updatePackage();
  }
  let numPathsRemoved = 0;
  pathsToRemove.map(path => {
    removePath(path, () => {
      numPathsRemoved++;
      if (numPathsRemoved === pathsToRemove.length) {
        // All paths have been processed
        // Now we can create files since we're done deleting.

        filesToCreate.map(file => createFile(file));
      }
    });
  });

  removePackageJsonScriptEntry('remove-demo');

  console.log(chalkSuccess('Demo app removed.'));
});
