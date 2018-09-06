import { isRootAtPath } from './isRootAtPath';

export const isCurrentRoot = () => isRootAtPath(`${process.cwd()}/`);