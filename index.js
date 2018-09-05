#!/usr/bin/env node
'use strict';

const program = require('commander');
const commands = require('./libs/commands');

program.command('install [framework]')
  .alias('i')
  .option('-l, --list', 'List the available frameworks you can install')
  .description('Installs the selected Framework globaly')
  .action(commands.install);


program.command('react install')
  .alias('ri')
  .option('--redux', 'Adds Redux to the React Installation')
  .option('--typescript', 'Uses Typescript in React')
  .description('Installs React globaly')
  .action(commands.installReact);

  program.parse(process.argv);