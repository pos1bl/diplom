import { Role } from "@models/IUser";

export const enum DEFAULT_PAGE {
  SPECIALIST = '/specialist',
  USER = '/user',
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/',
  FORM = '/form',
  ALL_SPECIALISTS = '/specialists',
  GIFTS = '/gifts',
  ABOUT = '/about',
  HELP = '/help',
  CAREER = '/career',
}

export const HEADER_NAVIGATION_LIST = [
  {
    name: 'Наші спеціалісти',
    navigateTo: DEFAULT_PAGE.FORM,
    availableRoles: []
  },
  {
    name: 'Подарункові сертифікати',
    navigateTo: DEFAULT_PAGE.GIFTS,
    availableRoles: []
  },
  {
    name: 'Про нас',
    navigateTo: DEFAULT_PAGE.ABOUT,
    availableRoles: []
  },
  {
    name: 'Точка опори',
    navigateTo: DEFAULT_PAGE.HELP,
    availableRoles: []
  },
  {
    name: 'Спеціалістам',
    navigateTo: DEFAULT_PAGE.CAREER,
    availableRoles: []
  },
];

export const USER_NAVIGATION_LIST = [
  {
    name: 'Мій акаунт',
    navigateTo: DEFAULT_PAGE.USER,
    availableRoles: [Role.USER]
  },
  {
    name: 'Сеанси',
    navigateTo: DEFAULT_PAGE.USER,
    availableRoles: [Role.USER]
  },
  {
    name: 'Налаштування',
    navigateTo: DEFAULT_PAGE.USER,
    availableRoles: [Role.USER]
  }
];
