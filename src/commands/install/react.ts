import { ExecaReturns, shellSync } from 'execa';

import { delay } from '../../helpers/delay';
import { Logger } from '../../utils/log';

export class InstallerReact {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.log('Installing React from NPM');
    await shellSync('npm install create-react-app -g');
    this.logger.success('React Install complete');
    await delay(2500);
    this.logger.log('Checking React Version now');
    this.getVersion().then((version: ExecaReturns) => {
      this.logger.success(version.stdout);
    });
  }

  private async getVersion(): Promise<ExecaReturns> {
    const version = await shellSync('create-react-app --version');
    return version;
  }
}
