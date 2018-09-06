import { isRootAtPath } from './isRootAtPath';
import { resolve } from 'path';

export const rootDirectory = (args?: any): string | boolean => {
	if (isRootAtPath(`${process.cwd()}/`)) {
		return process.cwd();
	}
	let relativePath = '';
	for (let i = 0; i < 5; i++) {
		relativePath += '../';
		if (isRootAtPath(`${process.cwd()}/${relativePath}`)) {
			return resolve(process.cwd(), relativePath);
		}
	}
	return false;
}