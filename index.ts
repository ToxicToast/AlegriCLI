#!/usr/bin/env node

import { AlegriCLI } from './src/index';

const cli = new AlegriCLI(process.argv);
cli.initCommands();
cli.parseCommands();
