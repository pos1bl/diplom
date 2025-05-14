import { AvailabilitySlot } from "@models/ISpecialist";
import { Theme } from "@mui/material";

export const ISSUES_LIST = [
  "Гостра реакція на стрес",
  "Фобії",
  "Адаптація до нових умов життя",
  "Кар'єрний розвиток",
  "Вікові кризи",
  "Пригніченість, апатія",
  "Проблеми з пам'яттю та концентрацією",
  "Комунікація в колективі",
  "Фінансові проблеми",
  "Депресія",
  "Втрата мотивації",
  "Емоційна заплутаність",
  "Робота з втратою та горюванням",
  "Фізичне та/або сексуальне насилля",
  "Work-life баланс",
  "Селфхарм",
  "Сталкінг",
  "Проблеми зі сном",
  "Обсессивно-компульсивний розлад",
  "Близька людина перебуває у зоні бойових дій / під окупацією",
  "Втрата та пошук сенсу життя",
  "Співзалежність",
  "Панічні атаки",
  "Булінг",
  "Саморефлексія",
  "Стосунки з родиною",
  "Етичні дилеми на роботі",
  "Звільнення та пошук роботи",
  "Еміграція",
  "Розлади харчової поведінки",
  "Стосунки з партнером",
  "Емоційне вигорання",
  "Прокрастинація",
  "Перервана вагітність / втрата дитини",
  "Почуття провини та сорому",
  "Стрес",
  "Інтимні стосунки",
  "ПТСР",
  "Спалахи гніву",
  "Проблеми з комунікацією",
  "Адаптація в новій компанії",
  "Проблеми з довірою",
  "Психосоматика",
  "Пошук партнера",
  "Страх публічних виступів",
  "Тривога та страх",
  "Проблеми з самооцінкою",
  "Супровід тяжких захворювань",
  "Будування особистих меж",
  "Лідерство та керування командою",
  "Супровід батьківства та вагітності",
  "Залежність",
  "Травмуючі події в минулому",
  "Розлучення",
  "Гендерна ідентичність",
  "Кар'єрна невизначеність",
  "Аб'юзивні відносини",
  "Самотність",
  "Зрада"
];

export const THERAPY_METHODS_LIST = [
  "Системна терапія",
  "КПТ",
  "Гештальт-терапія",
  "НЛП",
  "Психодинамічна терапія",
  "Травматерапія",
  "Психодрама",
  "Символдрама",
  "Наративна психологія",
  "Інтегративна психотерапія",
  "Позитивна психотерапія",
  "Психоаналіз",
  "Екзестинційний аналіз та логотерапія",
  "Транзактний аналіз",
  "Арт-терапія",
  "Клієнт-центрована терапія"
];

export const SPECIAL_GROUPS_LIST = [
  "Бізнес / HR запити",
  "Залежність (алко-, нарко-, і т.д)",
  "Вагітні та мами",
  "Люди з інвалідністю",
  "Діагностовані тяжкі захворювання",
  "Діагностовані психіатричні захворювання",
  "Учасники бойових дій",
  "ЛГБТ+",
  "Літні люди",
  "Чи тебе турбують суїцидальні думки?"
];

export const getStyles = (name: string, selected: readonly string[], theme: Theme) => {
  return {
    fontWeight: selected.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export type SpecialistFormValues = {
  avatarUrl: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  bio: string;
  yearsOfExperience: number;
  mainAreas: string[];
  secondaryAreas: string[];
  excludedAreas: string[];
  methods: string[];
  specialNeeds: string[];
  availability: {
    dayOfWeek: string;
    from: string;
    to: string;
  }[];
};

export const DEFAULT_AVAILABILITY: AvailabilitySlot[] = [
  { dayOfWeek: 'monday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'tuesday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'wednesday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'thursday', from: '08:00', to: '17:00' },
  { dayOfWeek: 'friday', from: '08:00', to: '17:00' },
];

export const dayLabels: Record<string, string> = {
    monday: 'Понеділок',
    tuesday: 'Вівторок',
    wednesday: 'Середа',
    thursday: 'Четвер',
    friday: 'П’ятниця',
    saturday: 'Субота',
    sunday: 'Неділя',
  };

export const days = Object.keys(dayLabels);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
