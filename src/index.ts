// import { command, parse } from 'commander';
import * as commander from 'commander';
import { readFileSync } from 'fs';

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
    this.cliCommand();
    this.installCommand();
    this.createCommand();
    this.helpCommand();
    this.versionCommand();
  }

  public parseCommands(): void {
    commander
      .parse(this.args);
  }

  private cliCommand(): void {
    commander
      .version(this.getCliVersion())
      .description(this.getCliDescription());
  }

  private installCommand(): void {
    commander
      .command('install')
      .alias('i')
      .description('Install a Resource from the List')
      .action(async (): Promise<void> => {
        this.installer.init().then((resource) => {
          if (resource === 'Typescript') {
            this.installer.typescript();
          } else if (resource === 'React') {
            this.installer.react();
          } else if (resource === 'Angular') {
            this.installer.angular();
          } else if (resource === 'Vue') {
            this.installer.vue();
          }
        });
      });
  }

  private createCommand(): void {
    commander
      .command('create')
      .alias('i')
      .description('Creates a Resource from the List')
      .action(async (cmd: any): Promise<void> => {
        this.creater.init().then((resource) => {
          if (resource === 'React') {
            this.creater.react(cmd);
          } else if (resource === 'Angular') {
            this.creater.angular(cmd);
          }
        });
      });
  }

  private helpCommand(): void {
    commander
      .command('help')
      .alias('h')
      .description('Help')
      .action(async (): Promise<void> => {
        this.helper.init();
      });
  }

  private versionCommand(): void {
    commander
      .command('version')
      .alias('v')
      .description('Shows the CLI-Version')
      .action(async (): Promise<void> => {
        this.version.init();
      });
  }

  private getCliVersion(): string {
    const contents = readFileSync('package.json', 'utf8');
    const parsed = JSON.parse(contents);
    return parsed.version;
  }

  private getCliDescription(): string {
    const contents = readFileSync('package.json', 'utf8');
    const parsed = JSON.parse(contents);
    return parsed.description;
  }
}
