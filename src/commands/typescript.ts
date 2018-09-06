import { Log } from '../utils/log';
import { cleanArgs } from '../utils/cleanArgs';
import { isCurrentRoot } from '../utils/isCurrentRoot';
import { shellSync } from 'execa';
import { ICmd } from '../interfaces/ICmd';

const log = new Log();

export const typescriptCommands = async (options: string, cmd: ICmd): Promise<void> => {
	const args = cleanArgs(cmd);
	const currentRoot = isCurrentRoot();
	//
	if (!currentRoot) {
		log.danger('This does not appear to be the root directory.');
    return;
	}
	//
	if (options === 'install') {
		log.log('Installing Typescript from NPM');
		shellSync('npm install typescript -g');
		log.success('NPM install complete');
		log.log('Checking Typescript Version');
		const version = shellSync('tsc --v');
		log.alegri(version.stdout);
	}
};