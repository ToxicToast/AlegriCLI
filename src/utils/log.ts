import chalk from 'chalk';
import { errorIcon, successIcon, defaultIcon, warningIcon } from './icons';

export class Log {

	public log(message: string): void {
		console.log(defaultIcon + message);
	}
	public warn(message: string): void  {
		console.log(warningIcon + chalk.yellow(message));
	}
	public danger(message: string): void  {
		console.log(errorIcon + chalk.red(message));
	}
	public success(message: string): void  {
		console.log(successIcon + chalk.green(message));
	}
	public alegri(message: string): void  {
		console.log(chalk.redBright(message));
	}

}