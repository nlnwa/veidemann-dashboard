import {isNumeric} from '../../func';

export enum Role {
  // Any authenticated user
  ANY_USER = 0,
  // Any user including unauthenticated users
  ANY = 1,
  // Administrator
  ADMIN = 2,
  // Curator
  CURATOR = 3,
  // A user with permission to read internal data
  READONLY = 4,
  // A crawl operator
  OPERATOR = 5,
  // Machine to machine
  SYSTEM = 6,
  // A user with permission to maintain seeds and entities
  CONSULTANT = 7,
}

export const roles = Object.keys(Role).filter(p => !isNumeric(p)).map(key => Role[key]);
