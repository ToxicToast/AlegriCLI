import { Log } from '../utils/log';
import { shellSync } from 'execa';
import { prompt } from 'inquirer';
import { IInstall } from '../interfaces/IInstall';
import { reactCommands } from './react';
import { typescriptCommands } from './typescript';
import { ICmd } from 'interfaces/ICmd';

const log = new Log();

export const installCommands = async (): Promise<void> => {
	const listPrompt: IInstall = await prompt({
		type: 'list',
		name: 'install',
		choices: [
			'Typescript',
			'React',
			// 'Angular'
		]
	});
	//
	if (listPrompt.install) {
		const resource = listPrompt.install;
		if (resource === 'React') {
			reactCommands('install', {} as ICmd);
		}
		if (resource === 'Typescript') {
			typescriptCommands('install', {} as ICmd);
		}
	}
}