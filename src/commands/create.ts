import { prompt } from 'inquirer';
import { Logger } from 'utils/log';
import { pushedOptions } from '../helpers/options';

export class Creater {
  private options: string[] = [];
  private prompt: any;
  private logger: Logger;

  constructor(logger: Logger) {
    this.options = pushedOptions;
    this.logger = logger;
  }

  public async init(): Promise<void> {
    // Do Nothing
  }
}
