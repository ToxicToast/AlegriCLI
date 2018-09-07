import chalk from 'chalk';

import { defaultIcon, errorIcon, successIcon, warningIcon } from '../helpers/iconHelper';

export class Logger {

  public log(message: string): void {
    this.outputLog(defaultIcon + message);
  }
  public warn(message: string): void  {
    this.outputLog(warningIcon + chalk.yellow(message));
  }
  public danger(message: string): void  {
    this.outputLog(errorIcon + chalk.red(message));
  }
  public success(message: string): void  {
    this.outputLog(successIcon + chalk.green(message));
  }
  public alegri(message: string): void  {
    this.outputLog(chalk.redBright(message));
  }

  private outputLog(message: string) {
    console.log(message);
  }
}
