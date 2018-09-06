import { ICmd, ICmdOption } from '../interfaces/ICmd';
import { IArgs } from '../interfaces/IArgs';
import { rootDirectory } from './rootDirectory';
import { loadAlegriFile } from './loadAlegriFile';
import { parse } from 'path';

export const cleanArgs = (cmd: ICmd): any => {
	let args: IArgs = {};
	if (cmd._name !== 'create') {
		args = createCommand(args);
	}
	cmd.options.forEach((o: ICmdOption) => {
		const key = o.long.replace(/^--/, '');
		if (key === 'typescript') {
			args.typescript = true;
		}
		if (key === 'redux') {
			args.redux = true;
		}
	});
	args.fileExtension = args.typescript ? 'ts' : 'js';
	args.command = cmd._name;
	//
	if (args.command === 'generate') {
		args = generateCommand(args, cmd.parent.args);
	}
	if (args.content) {
		args.content = args.content.split("\\n");
	}
	if (args.imports) {
    args.imports = args.imports.split("\\n");
	}
	if (args.components) {
    args.components = args.components.split(",");
	}
	args.isRoute = args.type === 'route';
	return args;
}

const createCommand = (args: IArgs): IArgs => {
	args.rootDirectory = rootDirectory();
	args = Object.assign(loadAlegriFile(args), args);
	return args;
}

const generateCommand = (args: IArgs, parentArgs: any[]): IArgs => {
	args.type = parentArgs[0];
	let resourcePath = parentArgs[1];
	if (!resourcePath) {
		args.type = 'component';
		resourcePath = parentArgs[0];
	} else {
		resourcePath = parse(resourcePath);
		args.resourceName = resourcePath.name;
		args.directory = resourcePath.dir;
	}
	if (args.resourceName) {
		args.resourceDisplayName = args.resourceName.split(/(?=[A-Z])/).join(" ");
		args.resourceLink = args.path ? args.path : args.resourceName.split(/(?=[A-Z])/).join("-").toLowerCase();
		if (args.resourceLink.charAt(0) !== '/') {
			args.resourceLink = '/' + args.resourceLink;
		}
	}
	return args;
}