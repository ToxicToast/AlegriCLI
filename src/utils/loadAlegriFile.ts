import { readFileSync } from 'fs';

export const loadAlegriFile = (args?: any) => {
	try {
		let file = readFileSync(`${args.rootDirectory}/.alegri`, { encoding: 'utf8' });
		return JSON.parse(file);
	} catch (error) {
		return {};
	}
}