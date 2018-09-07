import { Log } from '../utils/log';
import { shellSync } from 'execa';
import { prompt } from 'inquirer';
import { IInstall } from '../interfaces/IInstall';

const log = new Log();

export const createCommands = async (): Promise<void> => {
	const listPrompt: IInstall = await prompt({
		type: 'list',
		name: 'create',
		choices: [
			'React',
			'Angular'
		]
	});
	const name: IInstall = await prompt({
		type: 'input',
		name: 'project'
	});
	//
	const framework = listPrompt.create;
	const project = name.project;
	console.error(framework, project);
	//
	/*if (framework) {
		if (framework === 'React') {
			reactCommands('create', {} as ICmd);
		}
		if (framework === 'Angular') {
			typescriptCommands('create', {} as ICmd);
		}
	}*/
}