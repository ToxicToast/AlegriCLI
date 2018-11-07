import { prompt } from 'inquirer';

import { pushedOptions } from '../helpers/options';
import { Logger } from '../utils/log';
import { CreateAngular } from './create/angular';
import { CreateReact } from './create/react';
import { CreateVue } from './create/vue';

export class Creater {
  private options: string[] = [];
  private prompt: any;
  private logger: Logger;
  private createReact: CreateReact;
  private createAngular: CreateAngular;
  private createVue: CreateVue;

  constructor(logger: Logger) {
    this.options = pushedOptions;
    this.logger = logger;
    this.createReact = new CreateReact(this.logger);
    this.createAngular = new CreateAngular(this.logger);
    this.createVue = new CreateVue(this.logger);
  }

  public async init(): Promise<string> {
    await this.initPrompt();
    return this.prompt.creater;
  }

  public async react(cmd: any): Promise<void> {
    await this.createReact.init(cmd);
  }

  public async angular(cmd: any): Promise<void> {
    await this.createAngular.init(cmd);
  }

  public async vue(cmd: any): Promise<void> {
    await this.createVue.init(cmd);
  }

  private async initPrompt(): Promise<void> {
    this.prompt = await prompt({
      type: 'list',
      name: 'creater',
      choices: this.options.filter((option) => {
        return (option !== 'Typescript');
      }),
    });
  }
}
