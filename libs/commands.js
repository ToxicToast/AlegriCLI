const utils = require('./utils');
const inquirer = require('inquirer');
const fs = require('fs');
// const handlebars = require('handlebars');
const execa = require('execa');
const chalk = require('chalk');
const errors = require('./errors');
const log = require('./log');
const ncp = require('ncp').ncp;


const install = async (feature, cmd) => {
  require('./commands/install').installCommand(feature, cmd);
};
module.exports = { install };