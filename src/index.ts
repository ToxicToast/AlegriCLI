import { command, parse } from 'commander';
import { Creater } from './commands/create';
import { Helper } from './commands/help';
import { Installer } from './commands/install';
import { Version } from './commands/version';
import { Logger } from './utils/log';

export class AlegriCLI {
  private args: string[];
  private installer: Installer;
  private helper: Helper;
  private version: Version;
  private logger: Logger;
  private creater: Creater;

  constructor(args: string[]) {
    this.args = args;
    this.logger = new Logger();
    this.installer = new Installer(this.logger);
    this.helper = new Helper(this.logger);
    this.version = new Version(this.logger);
    this.creater = new Creater(this.logger);
  }

  public initCommands(): void {
    this.installCommand();
    this.createCommand();
    this.helpCommand();
    this.versionCommand();
  }

  public parseCommands(): void {
    parse(this.args);
  }

  private installCommand(): void {
    command('install')
      .alias('i')
      .description('Install a Resource from the List')
      .action(async () => {
        this.installer.init().then((resource) => {
          if (resource === 'Typescript') {
            this.installer.typescript();
          } else if (resource === 'React') {
            this.installer.react();
          }
        });
      });
  }

  private createCommand(): void {
    command('create')
      .alias('i')
      .description('Creates a Resource from the List')
      .action(async (cmd: any) => {
        this.creater.init().then((resource) => {
          if (resource === 'React') {
            this.creater.react(cmd);
          }
        });
      });
  }

  private helpCommand(): void {
    command('help')
      .alias('h')
      .description('Help')
      .action(async () => {
        this.helper.init();
      });
  }

  private versionCommand(): void {
    command('version')
      .alias('v')
      .description('Shows the CLI-Version')
      .action(async () => {
        this.version.init();
      });
  }
}
