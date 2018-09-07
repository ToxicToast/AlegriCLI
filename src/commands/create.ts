import { prompt } from 'inquirer';
import { Logger } from 'utils/log';
import { pushedOptions } from '../helpers/options';
import { CreateReact } from './create/react';

export class Creater {
  private options: string[] = [];
  private prompt: any;
  private logger: Logger;
  private createReact: CreateReact;

  constructor(logger: Logger) {
    this.options = pushedOptions;
    this.logger = logger;
    this.createReact = new CreateReact(this.logger);
  }

  public async init(): Promise<string> {
    await this.initPrompt();
    return this.prompt.creater;
  }

  public async react(cmd: any): Promise<void> {
    await this.createReact.init(cmd);
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
