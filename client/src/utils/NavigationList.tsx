import { Role } from "@models/IUser";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpIcon from '@mui/icons-material/Help';

export const enum DEFAULT_PAGES {
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/',
  FORM = '/form',
  SPECIALISTS = '/specialists',
  ALL_SPECIALISTS = '/specialists',
  SPECIALIST = '/specialists/$specialistId',
  GIFTS = '/gifts',
  SUPPORT = '/support',
  CAREER = '/career',
  GIFTS_SUCCESS_PAYMENT = '/gifts/payment-success',
};

export const enum USER_PAGES {
  HOME = '/user',
  APPOINTMENTS = '/user/appointments',
  VERIFY_VICTIM = '/user/verify-victim',
  SUPPORT = '/user/support',
  SETTINGS = '/user/settings',
  SUCCESS_PAYMENT = '/user/payment-success',
};

export const enum SPECIALIST_PAGES {
  HOME = '/specialist',
  APPOINTMENTS = '/user/appointments',
  SPECIALISTS = '/user/specialists',
  SUPPORT = '/user/support',
  SETTINGS = '/user/settings',
};

export const enum ADMIN_PAGES {
  HOME = '/admin',
  ADD_SPECIALIST = '/admin/add-specialist',
  VERIFY_VICTIM = '/admin/verify-victim',
};

export const HEADER_NAVIGATION_LIST = [
  {
    name: 'Наші фахівці',
    navigateTo: DEFAULT_PAGES.SPECIALISTS,
    availableRoles: []
  },
  {
    name: 'Подарункові сертифікати',
    navigateTo: DEFAULT_PAGES.GIFTS,
    availableRoles: []
  },
  {
    name: 'Точка опори',
    navigateTo: DEFAULT_PAGES.SUPPORT,
    availableRoles: []
  },
  {
    name: 'Фахівцям',
    navigateTo: DEFAULT_PAGES.CAREER,
    availableRoles: []
  },
];

export const USER_NAVIGATION_LIST = [
  {
    name: 'Головна',
    navigateTo: USER_PAGES.HOME,
    icon: <HomeIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Мої сеанси',
    navigateTo: USER_PAGES.APPOINTMENTS,
    icon: <CalendarTodayIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Ключ до Опори',
    navigateTo: USER_PAGES.VERIFY_VICTIM,
    icon: <PeopleIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Підтримка',
    navigateTo: USER_PAGES.SUPPORT,
    icon: <HelpIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  },
  {
    name: 'Налаштування',
    navigateTo: USER_PAGES.SETTINGS,
    icon: <SettingsIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.USER]
  }
];

export const ADMIN_NAVIGATION_LIST = [
  {
    name: 'Головна',
    navigateTo: ADMIN_PAGES.HOME,
    icon: <HomeIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
  {
    name: 'Додати фахівця',
    navigateTo: ADMIN_PAGES.ADD_SPECIALIST,
    icon: <PersonAddIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
  {
    name: 'Обробити заявки',
    navigateTo: ADMIN_PAGES.VERIFY_VICTIM,
    icon: <PersonAddIcon sx={{ color: "#AC98D1" }} />,
    availableRoles: [Role.ADMIN]
  },
];

export const getNavigationList = (role: Role) => {
  switch(role) {
    case Role.ADMIN:
      return ADMIN_NAVIGATION_LIST;
    // case Role.SPECIALIST:
    //   return SPECIALIST_NAVIGATION_LIST;
    default:
      return USER_NAVIGATION_LIST;
  }
}
