import { Logger } from '../utils/log';

export class Helper {
  private options: any[] = [];
  private commands: any[] = [];
  private logger: Logger;

  constructor(logger: Logger) {
    this.options.push({
      name: 'Typescript',
      description: 'Typescript is a typed superset of Javascript that compiles to plain Javascript',
    });
    this.options.push({
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
    });
    //
    this.commands.push({
      name: 'install',
      description: 'Outputs a List with Install Options',
    });
    this.commands.push({
      name: 'create',
      description: 'Creates a Resource with a given Name',
    });
    this.commands.push({
      name: 'help',
      description: 'Outputs the Helper',
    });
    this.commands.push({
      name: 'version',
      description: 'Outputs the CLI Version',
    });
    //
    this.logger = logger;
  }

  public init(): void {
    this.logger.warn('You have following Install Options:');
    this.options.forEach((option) => {
      const { name, description } = option;
      this.logger.log(`- ${name} (${description})`);
    });
    this.logger.warn('You have following Commands:');
    this.commands.forEach((command) => {
      const { name, description } = command;
      this.logger.log(`- ${name} (${description})`);
    });
  }
}
