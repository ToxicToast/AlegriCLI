import { Log } from './log';

const log = new Log();

export const destroyFile = (error: any) => {
	if (error.code === 'ENOENT') {
		log.danger('File does not exist and cannot be deleted.');
	}
}

export const writeGeneratedFile = (error: any) => {
	if (error.code === 'EEXIST') {
    log.danger(`A file already exists at ${error.path}. Overwriting prevented.`);
	}
	if (error.code === 'ENOENT') {
    log.danger(`Not able to create ${error.path}.`);
    log.danger('You can create components directly to any subdirectory, but the directory itself must already exist.');
  }
}