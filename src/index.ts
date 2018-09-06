import { command, parse } from 'commander';
import { IProcessEnv } from './interfaces/IProcessEnv';
import { reactCommands } from './commands/react';
import { typescriptCommands } from './commands/typescript';
//
class AlegriCLI {
	private args: string[];

	constructor(args: string[]) {
		this.args = args;
		this.installReact();
		this.installTypescript();
		this.parseCommands();
	}

	private installTypescript(): void {
		command('typescript install')
			.alias('tsi')
			.description('Installs Typescript')
			.action(typescriptCommands);
	}

	private installReact(): void {
		command('react install')
			.alias('ri')
			// .option('-r, --redux', 'Adds Redux Support')
			// .option('-ts, --typescript', 'Adds Typescript Support')
			.description('Installs the React Framework')
			.action(reactCommands);
	}

	private parseCommands(): void {
		parse(this.args);
	}
}
//
const cli = new AlegriCLI(process.argv);