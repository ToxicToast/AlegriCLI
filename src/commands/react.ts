import { Log } from '../utils/log';
import { cleanArgs } from '../utils/cleanArgs';
import { isCurrentRoot } from '../utils/isCurrentRoot';
import { shellSync } from 'execa';
import { ICmd } from '../interfaces/ICmd';

const log = new Log();

export const reactCommands = async (options: string, cmd: ICmd): Promise<void> => {
	const args = cleanArgs(cmd);
	const currentRoot = isCurrentRoot();
	//
	if (!currentRoot) {
		log.danger('This does not appear to be the root directory.');
    return;
	}
	//
	if (options === 'install') {
		log.log('Installing React from NPM');
		shellSync('npm install create-react-app -g');
		log.success('NPM install complete');
		log.log('Checking React Version');
		const version = shellSync('create-react-app --version');
		log.alegri(version.stdout);
	}
	//
	if (options === 'generate') {
		const name = cmd;
		log.log(`Creating new project in '${name}' directory.`);
	}
};