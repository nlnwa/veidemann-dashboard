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
}
