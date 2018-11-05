import { ExecaReturns, shellSync } from 'execa';
import { delay } from '../../helpers/delay';
import { Logger } from '../../utils/log';

export class InstallerAngular {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.log('Installing Angular from NPM');
    await shellSync('npm install @angular/cli -g');
    this.logger.success('Angular Install complete');
    await delay(2500);
    this.logger.log('Checking Angular Version now');
    /* this.getVersion().then((version: ExecaReturns) => {
      this.logger.success(version.stdout);
    }); */
    this.logger.warn('ng version only works in Angular Projects or Global');
  }

  private async getVersion(): Promise<ExecaReturns> {
    const version = await shellSync('ng version');
    return version;
  }
}
