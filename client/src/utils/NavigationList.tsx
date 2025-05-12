import { Role } from "@models/IUser";
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';

export const enum DEFAULT_PAGES {
  SPECIALIST = '/specialist',
  USER = '/user',
  LOGIN = '/sign-in',
  SETTINGS = '/settings',
  HOME_PAGE = '/',
  FORM = '/form',
  ALL_SPECIALISTS = '/specialists',
  GIFTS = '/gifts',
  SUPPORT = '/support',
  CAREER = '/career',
};

export const enum USER_PAGES {
  HOME = '/user',
  APPOINTMENTS = '/user/appointments',
  SPECIALISTS = '/user/specialists',
  SUPPORT = '/user/support',
  SETTINGS = '/user/settings',
}

export const HEADER_NAVIGATION_LIST = [
  {
    name: 'Наші спеціалісти',
    navigateTo: DEFAULT_PAGES.FORM,
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
    name: 'Спеціалістам',
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
    name: 'Мої спеціалісти',
    navigateTo: USER_PAGES.SPECIALISTS,
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
