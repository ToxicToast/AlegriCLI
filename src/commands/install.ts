import { prompt } from 'inquirer';
import { Logger } from '../utils/log';

import { pushedOptions } from '../helpers/options';
import { InstallerAngular } from './install/angular';
import { InstallerReact } from './install/react';
import { InstallerTypescript } from './install/typescript';
import { InstallerVue } from './install/vue';

export class Installer {
  private options: string[] = [];
  private prompt: any;
  private logger: Logger;
  private reactInstaller: InstallerReact;
  private typescriptInstaller: InstallerTypescript;
  private angularInstaller: InstallerAngular;
  private vueInstaller: InstallerVue;

  constructor(logger: Logger) {
    this.options = pushedOptions;
    this.logger = logger;
    this.reactInstaller = new InstallerReact(this.logger);
    this.typescriptInstaller = new InstallerTypescript(this.logger);
    this.angularInstaller = new InstallerAngular(this.logger);
    this.vueInstaller = new InstallerVue(this.logger);
  }

  public async init(): Promise<string> {
    await this.initPrompt();
    return this.prompt.installer;
  }

  public async react(): Promise<void> {
    await this.reactInstaller.init();
  }

  public async typescript(): Promise<void> {
    await this.typescriptInstaller.init();
  }

  public async angular(): Promise<void> {
    await this.angularInstaller.init();
  }

  public async vue(): Promise<void> {
    await this.vueInstaller.init();
  }

  private async initPrompt(): Promise<void> {
    this.prompt = await prompt({
      type: 'list',
      name: 'installer',
      choices: this.options,
    });
  }
}
