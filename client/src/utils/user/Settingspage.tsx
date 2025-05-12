import { EmailChangeForm } from "@components/user/Settings/EmailChangeForm";
import { NameChangeForm } from "@components/user/Settings/NameChangeForm";
import { NotificationSettings } from "@components/user/Settings/NotificationSettings";
import { PassChangeForm } from "@components/user/Settings/PassChangeForm";
import { ComponentType } from "react";

interface AccordionItem {
  id: number
  title: string
  component: ComponentType<any>
}

export const SETTINGS_ACCORDIONS: AccordionItem[] = [
  {
    id: 0,
    title: "Змінити ім'я",
    component: NameChangeForm,
  },
  {
    id: 1,
    title: "Змінити email",
    component: EmailChangeForm,
  },
  {
    id: 2,
    title: "Змінити пароль",
    component: PassChangeForm,
  },
  {
    id: 3,
    title: "Сповіщення",
    component: NotificationSettings,
  },
];

export enum PASSWORD_NAME_FIELD {
  CURRENT = 'currentPassword',
  NEW = 'newPassword',
  CONFIRM = 'confirmPassword',
};

export const PASSWORD_FIELDS = [
  {
    name: PASSWORD_NAME_FIELD.CURRENT,
    label: 'Поточний пароль',
  },
  {
    name: PASSWORD_NAME_FIELD.NEW,
    label: 'Новий пароль',
  },
  {
    name: PASSWORD_NAME_FIELD.CONFIRM,
    label: 'Підтвердження пароля',
  },
];

export const NOTIFICATION_LIST = [
  'Одразу після оплати сеансу',
  'Одразу після перенесення чи скасування сеансу',
  'За 1 годину до початку сеансу',
  'Коли психотерапевт скасував попереднє бронювання',
];
