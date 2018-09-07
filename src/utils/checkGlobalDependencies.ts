import { shellSync } from 'execa';

export const checkGlobalDependencies = async (args?: any) => {
	if (args.command === 'react') {
		checkReact();
	}
}

const checkReact = () => {
	try {
		const { stdout } = shellSync('create-react-app --version');
	} catch (error) {
		// install react
	}
}

const checkTypescript = () => {
	try {
		const { stdout } = shellSync('tsc --version');
	} catch (error) {
		// install typescript
	}
}

const checkAngular = () => {
	try {
		const { stdout } = shellSync('ng --version');
	} catch (error) {
		// install angular
	}
}