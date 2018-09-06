import { existsSync } from 'fs';

export const isRootAtPath = (path: string) => {
  return existsSync(`${path}package.json`);
}