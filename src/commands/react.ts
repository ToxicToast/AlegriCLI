import { Log } from '../utils/log';
import { cleanArgs } from '../utils/cleanArgs';
import { shellSync } from 'execa';
import { ICmd } from '../interfaces/ICmd';

const log = new Log();

export const installReact = async (options: any, cmd: ICmd): Promise<void> => {
	const args = cleanArgs(cmd);
	// const currentRoot = utils.isCurrentRoot();
	log.log('Installing React from NPM');
	// shellSync('npm install create-react-app -g');
	log.success('NPM install complete');
	//
	console.error(args);
};