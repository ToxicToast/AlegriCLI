import { shellSync } from 'execa';
import { prompt } from 'inquirer';
import { Logger } from '../../utils/log';

interface IProjectName {
  title?: string;
}

export class CreateAngular {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

    public async init(cmd: any): Promise<void> {
        console.error(cmd, 'angular');
        const title = await this.projectName();
        const command = `ng new ${title}`;
        this.logger.warn(`Creating Project ${title}`);
        await shellSync(command);
        this.logger.success(`${title} created successfully.`);
        this.logger.success(`Type cd ${title} into the console to visit the Project`);
        // this.logger.alegri('Do you want to add the Redux Boilerplate? y/n');
    }

  private async projectName(): Promise<string> {
    const title: IProjectName = await prompt({
      type: 'input',
      name: 'title',
      message: 'What is the Projectname?',
    });
    const projectName = title.title;
    const returnValue = `${projectName}`;
    return returnValue.toLowerCase();
  }
}
