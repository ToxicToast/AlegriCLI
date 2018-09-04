const utils = require('../utils');
const log = require('../log');
const execa = require('execa');

const installCommand = async (feature, cmd) => {
  const args = utils.cleanArgs(cmd);
  const options = ['react', 'angular', 'vue'];
  //
  if (args.list || feature === 'list') {
    log.log(`Install options are: ${options.join(', ')}`);
    return;
  }
  if (!options.includes(feature)) {
    log.danger(`${feature} is not an option`);
    log.log(`Install options are: ${options.join(', ')}`);
    return;
  }
  if (!utils.isCurrentRoot()) {
    log.danger(`This does not appear to be the root directory.`);
    return;
  }
  if (feature === 'react') {
    utils.installReact();
  }
  if (feature === 'angular') {
    utils.installAngular();
  }
};
module.exports = { installCommand };