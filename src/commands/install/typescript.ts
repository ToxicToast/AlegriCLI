import { ExecaReturns, shellSync } from 'execa';

import { delay } from '../../helpers/delay';
import { Logger } from '../../utils/log';

export class InstallerTypescript {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.log('Installing Typescript from NPM');
    await shellSync('npm install typescript -g');
    this.logger.success('Typescript Install complete');
    await delay(2500);
    this.logger.log('Checking Typescript Version now');
    this.getVersion().then((version: ExecaReturns) => {
      this.logger.success(version.stdout);
    });
  }

  private async getVersion(): Promise<ExecaReturns> {
    const version = await shellSync('tsc --version');
    return version;
  }
}
