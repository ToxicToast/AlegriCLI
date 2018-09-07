import { command, parse } from 'commander';

import { Logger } from './utils/log';

import { Installer } from './commands/install';
import { Helper } from './commands/help';
import { Version } from './commands/version';

export class AlegriCLI {
	private args: string[];
	private installer: Installer;
	private helper: Helper;
	private version: Version;
	private logger: Logger;

	constructor(args: string[]) {
		this.args = args;
		this.logger = new Logger();
		this.installer = new Installer(this.logger);
		this.helper = new Helper(this.logger);
		this.version = new Version(this.logger);
	}

	public initCommands(): void {
		this.installCommand();
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
				this.installer.init().then(resource => {
					if (resource === 'Typescript') {
						this.installer.typescript();
					} else if (resource === 'React') {
						this.installer.react();
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