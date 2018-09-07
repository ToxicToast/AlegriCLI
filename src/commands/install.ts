import { prompt } from 'inquirer';
import { Logger } from 'utils/log';

export class Installer {
	private options: string[] = [];
	private prompt: any;
	private logger: Logger;

	constructor(logger: Logger) {
		this.options.push('Typescript');
		this.options.push('React');
		this.logger = logger;
	}

	public async init(): Promise<string> {
		await this.initPrompt();
		return this.prompt.installer;
	}

	private async initPrompt(): Promise<void> {
		this.prompt = await prompt({
			type: 'list',
			name: 'installer',
			choices: this.options
		});
	}
}