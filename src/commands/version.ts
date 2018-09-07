import { prompt } from 'inquirer';
import { Logger } from 'utils/log';
import { readFileSync } from 'fs';

export class Version {
	private logger: Logger;

	constructor(logger: Logger) {
		this.logger = logger;
	}

	public init(): void {
		const version = this.getPackageFile();
		this.logger.alegri(`Current CLI Version: ${version}`);
	}

	private getPackageFile(): string {
		const contents = readFileSync('package.json', 'utf8');
		const parsed = JSON.parse(contents);
		return parsed.version;
	}
}