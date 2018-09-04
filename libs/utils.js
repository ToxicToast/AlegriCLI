const log = require('./log');
const ncp = require('ncp').ncp;
const inquirer = require('inquirer');
const execa = require('execa');
const fs = require('fs');
const path = require('path');
//
const isRootAtPath = (path) => {
  return fs.existsSync(`${path}package.json`);
}

const rootDirectory = (args) => {
  if (isRootAtPath(`${process.cwd()}/`) ) {
    return process.cwd();
  }
  let relativePath = '';
  for (let i = 0; i < 5; i++) {
    relativePath += '../';
    if(isRootAtPath(`${process.cwd()}/${relativePath}`)) {
      return path.resolve(process.cwd(), relativePath);
    }
  }
  return false;
}

const loadAlegriFile = (args) => {
  try {
    let file = fs.readFileSync(`${args.rootDirectory}/.alegri`, { encoding: 'utf8' });
    return JSON.parse(file);
  } catch(error) {
    return {};
  }
}

const cleanArgs = (cmd) => {
  let args = {};
  if (cmd._name !== 'create') {
    args = {
      rootDirectory: rootDirectory()
    };
    args = Object.assign(loadAlegriFile(args), args);
  }
  cmd.options.forEach(o => {
    const key = o.long.replace(/^--/, '');
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
    if (typeof cmd[key.substr(3)] !== 'function' && typeof cmd[key.substr(3)] !== 'undefined') {
      args[key.substr(3)] = cmd[key.substr(3)];
    }
  });
  args.fileExtension = args.typescript ? 'ts' : 'js';
  args.command = cmd._name;
  if (args.command === 'generate') {
    args.type = cmd.parent.args[0];
    let resourcePath = cmd.parent.args[1];
    if (!resourcePath) {
      args.type = 'component';
      resourcePath = cmd.parent.args[0];
    }
    if (resourcePath) {
      resourcePath = path.parse(resourcePath);
      args.resourceName = resourcePath.name;
      args.directory = resourcePath.dir;
    }
    if (args.resourceName) {
      args.resourceDisplayName = args.resourceName.split(/(?=[A-Z])/).join(" ");
      args.resourceLink = args.path ?
      args.path :
      args.resourceName.split(/(?=[A-Z])/).join("-").toLowerCase();
      if (args.resourceLink.charAt(0) !== '/') {
      args.resourceLink = '/' + args.resourceLink;
    }
  }
  if (args.content) {
    args.content = args.content.split("\\n");
  }
  if (args.imports) {
    args.imports = args.imports.split("\\n");
  }
  if (args.components) {
    args.components = args.components.split(",");
  }
    args.isRoute = args.type === 'route';
  }
  return args
};

const isCurrentRoot = () => isRootAtPath(`${process.cwd()}/`);

const installReact = async () => {
  log.log(`Installing React from NPM`);
  execa.shellSync('npm install create-react-app -g');
  log.success('✅  NPM install complete');
}

const installAngular = async () => {
  log.log(`Installing Angular from NPM`);
  execa.shellSync('npm install @angular/cli -g');
  log.success('✅  NPM install complete');
}

const installTypescript = async () => {
  let answers = await inquirer.prompt({
    type: 'confirm',
    name: 'install',
    message: 'Because you want TypeScript support we need to add the tsc dependency - this is a one-time install. Install globally now?'
  });
  if (answers.install) {
    log.alegri('Installing TypeScript, please wait. This will take a minute.');
    execa.shellSync('npm install -g typescript');
    log.success('TypeScript installed\n');
  } else {
    process.exitCode = 1;
    log.danger('You must install TypeScript to use this command. Exiting now.');
  }
}

module.exports = {
  isRootAtPath,
  rootDirectory,
  cleanArgs,
  isCurrentRoot,
  installReact,
  installAngular,
  installTypescript
};