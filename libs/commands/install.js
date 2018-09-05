const utils = require('../utils');
const log = require('../log');
const execa = require('execa');

const installCommand = async (framework, feature, cmd) => {
  const args = utils.cleanArgs(cmd);
  const options = ['react', 'angular', 'typescript'];
  //
  if (!options.includes(framework) && framework !== undefined) {
    log.danger(`${framework} is not an option`);
    log.log(`Install options are: ${options.join(', ')}`);
    return;
  }
  if (!utils.isCurrentRoot()) {
    log.danger(`This does not appear to be the root directory.`);
    return;
  }
  if (framework === 'react') {
    utils.installReact();
  }
  if (framework === 'angular') {
    utils.installAngular();
  }
  if (framework === 'typescript') {
    utils.installTypescript();
  }
  log.log(args);
  log.log(feature);
};
module.exports = { installCommand };