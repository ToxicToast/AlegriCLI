#!/usr/bin/env node
'use strict';

const program = require('commander');
const commands = require('./libs/commands');

program.command('install [framework]')
  .alias('i')
  .option('-l, --list', 'List the available frameworks you can install')
  .description('Installs the selected Framework globaly')
  .action(commands.install);

  program.parse(process.argv);