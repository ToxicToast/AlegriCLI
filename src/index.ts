import { command, parse } from 'commander';
import { IProcessEnv } from './interfaces/IProcessEnv';
import { reactCommands } from './commands/react';
import { typescriptCommands } from './commands/typescript';
import { installCommands } from './commands/install';
import { createCommands } from './commands/create';
//
class AlegriCLI {
	private args: string[];

	constructor(args: string[]) {
		this.args = args;
		//
		this.install();
		this.create();
		this.installReact();
		this.installTypescript();
		this.createReactApp();
		//
		this.parseCommands();
	}

	private async install(): Promise<void> {
		command('alegri-install')
			.description('Install a Resource')
			.action(() => {
				installCommands();
			});
	}

	private async create(): Promise<void> {
		command('alegri-create')
			.description('Creates a Resource')
			.action(() => {
				createCommands();
			});
	}

	private installTypescript(): void {
		command('typescript-install')
			.description('Installs Typescript')
			.action(typescriptCommands);
	}

	private installReact(): void {
		command('react install')
			.description('Installs the React Framework')
			.action(reactCommands);
	}

	private createReactApp(): void {
		command('react generate <name>')
			.description('Make a new Project in the <name> directory.')
			.option('-r, --redux', 'Include Redux Boilerplate and Structure')
			.option('-ts, --typescript', 'Create Project in Typescript')
			.option('--no-git', 'Do not include git files and init process')
			.action(reactCommands);
	}

	private parseCommands(): void {
		parse(this.args);
	}
}
//
new AlegriCLI(process.argv);