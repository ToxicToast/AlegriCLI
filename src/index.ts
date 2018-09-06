import { command, parse } from 'commander';
import { IProcessEnv } from './interfaces/IProcessEnv';
import { installReact } from './commands/react';
//
class AlegriCLI {
	private args: string[];

	constructor(args: string[]) {
		this.args = args;
		this.installReact();
		this.parseCommands();
	}

	private installReact(): void {
		command('react install')
			.alias('ri')
			.option('-r, --redux', 'Adds Redux Support')
			.option('-ts, --typescript', 'Adds Typescript Support')
			.description('Installs the React Framework')
			.action(installReact);
	}

	private parseCommands(): void {
		parse(this.args);
	}
}
//
const cli = new AlegriCLI(process.argv);