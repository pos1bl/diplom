export const enum DEFAULT_PAGE {
  SPECIALIST = '/specialist',
  USER = '/user',
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/',
  FORM = '/form',
  GIFTS = '/gifts',
  ABOUT = '/about',
  HELP = '/help',
  CAREER = '/career',
}

export const DRAWER_NAVIGATION_LIST = [
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
