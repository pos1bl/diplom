import { Role } from '../models/IUser';

export const enum DEFAULT_PAGE {
  SPECIALIST = '/specialist',
  USER = '/user',
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/'
}

export const DRAWER_NAVIGATION_LIST = [
  {
    name: 'Specialist',
    navigateTo: DEFAULT_PAGE.SPECIALIST,
    availableRoles: [Role.SPECIALIST]
  },
  {
    name: 'User',
    navigateTo: DEFAULT_PAGE.USER,
    availableRoles: [Role.USER]
  },
  {
    name: 'Settings',
    navigateTo: DEFAULT_PAGE.SETTINGS,
    availableRoles: []
  },
];
