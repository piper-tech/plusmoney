import {
  logupPath,
  loginPath,
  usersPath,
  entriesPath,
  mePath,
  categoriesPath
} from './paths/';

export default {
  '/logup': logupPath,
  '/login': loginPath,
  '/me': mePath,
  '/users': usersPath,
  '/entries': entriesPath,
  '/categories': categoriesPath
};
