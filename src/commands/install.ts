import { prompt } from 'inquirer';
import { Logger } from 'utils/log';

import { InstallerReact } from './install/react';
import { InstallerTypescript } from './install/typescript';

export class Installer {
	private options: string[] = [];
	private prompt: any;
	private logger: Logger;
	private reactInstaller: InstallerReact;
	private typescriptInstaller: InstallerTypescript;

	constructor(logger: Logger) {
		this.options.push('Typescript');
		this.options.push('React');
		this.logger = logger;
		this.reactInstaller = new InstallerReact(this.logger);
		this.typescriptInstaller = new InstallerTypescript(this.logger);
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

	private async initPrompt(): Promise<void> {
		this.prompt = await prompt({
			type: 'list',
			name: 'installer',
			choices: this.options
		});
	}
}