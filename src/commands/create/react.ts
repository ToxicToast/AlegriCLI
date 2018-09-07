import { shellSync } from 'execa';
import { prompt } from 'inquirer';
import { Logger } from 'utils/log';

interface IProjectName {
  title?: string;
}
interface ITypescript {
  typescript?: string;
}

export class CreateReact {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  public async init(cmd: any): Promise<void> {
    console.debug(cmd);
    const title = await this.projectName();
    const status = await this.typeScript();
    if (status) {
      const typescript = this.asTypescript();
      const command = `create-react-app ${title} ${typescript}`;
      this.logger.warn(`Creating Project ${title} as Typescript`);
      await shellSync(command);
    } else {
      const command = `create-react-app ${title}`;
      this.logger.warn(`Creating Project ${title}`);
      await shellSync(command);
    }
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
    return `${projectName}`;
  }

  private async typeScript(): Promise<any> {
    const typescript: ITypescript = await prompt({
      type: 'confirm',
      name: 'typescript',
      message: 'Do you want to create the Project as Typescript',
    });
    return typescript.typescript;
  }

  private asTypescript(): string {
    return '--scripts-version=react-scripts-ts';
  }
}
