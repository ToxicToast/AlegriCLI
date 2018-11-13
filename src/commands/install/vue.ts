import { ExecaReturns, shellSync } from 'execa';

import { delay } from '../../helpers/delay';
import { Logger } from '../../utils/log';

export class InstallerVue {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.log('Installing VueJS from NPM');
    await shellSync('npm install @vue/cli -g');
    this.logger.success('VueJS Install complete');
    await delay(2500);
    this.logger.log('Checking VueJS Version now');
    this.getVersion().then((version: ExecaReturns) => {
      this.logger.success(version.stdout);
    });
  }

  private async getVersion(): Promise<ExecaReturns> {
    const version = await shellSync('vue --version');
    return version;
  }
}
