#!/usr/bin/env node
'use strict';

const program = require('commander');
const commands = require('./libs/commands');

program.command('install <type>')
  .alias('i')
  .description('Installs the selected Framework globaly')
  .action(commands.install);

  program.parse(process.argv);