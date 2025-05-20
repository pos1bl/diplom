import { sessionPrice } from "@utils/shared";

export type SectionProps = {
  onScrollToOptions: () => void
};

export const STEPS_LIST = [
  {
    id: 1,
    image: 'images/gifts/steps/step1.png',
    text: 'Оберіть для близької людини номінал сертифіката та оплатіть його.'
  },
  {
    id: 2,
    image: 'images/gifts/steps/step2.png',
    text: 'Сертифікат з подарунковим кодом надійде вам на емейл.'
  },
  {
    id: 3,
    image: 'images/gifts/steps/step3.png',
    text: 'Отримувач сертифіката обере фахівця на нашій платформі.'
  },
  {
    id: 4,
    image: 'images/gifts/steps/step4.png',
    text: 'Під час придбання сеансу, отримувачу потрібно буде ввести код з сертифіката.'
  }
];

export const getPrice = (amount: number, discount: number) => {
  const startPrice = amount * sessionPrice;

  return startPrice - startPrice / 100 * discount
};

export type GiftOption = {
  id: number;
  amount: number;
  discount: number;
  title: string;
  subtitle: string;
  description: string;
  priceId: string;
}

export const GIFT_OPTIONS: GiftOption[] = [
  {
    id: 1,
    amount: 1,
    discount: 0,
    title: 'Індивідуальний сеанс',
    subtitle: 'Знайомство зі фахівцем',
    description: 'Перший крок до покращення самопочуття — обговорити запит з фахівцем і визначити план дій.',
    priceId: 'price_1RMERH1F5X1CXToisddCJ89X',
  },
  {
    id: 2,
    amount: 3,
    discount: 5,
    title: 'Індивідуальних сеанси',
    subtitle: 'Початок шляху',
    description: 'Цей формат дозволить створити довіру, зануритися в процес і відчути перші зрушення.',
    priceId: 'price_1RMESI1F5X1CXToig4gntGdm',
  },
  {
    id: 3,
    amount: 6,
    discount: 10,
    title: 'Індивідуальних сеансів',
    subtitle: 'Перші результати',
    description: 'Регулярна робота з фахівцем допоможе краще зрозуміти себе та стабілізувати емоційний стан.',
    priceId: 'price_1RMESq1F5X1CXToi5vNT3oR6',
  },
  {
    id: 4,
    amount: 12,
    discount: 15,
    title: 'Індивідуальних сеансів',
    subtitle: 'Найвигідніші умови',
    description: 'Повноцінний цикл роботи з фахівцем для глибокого пропрацювання запиту і закріплення змін.',
    priceId: 'price_1RMET71F5X1CXToiMvRHUN6L',
  },
];

export const CERIFICATE_HELPS_LIST = [
  { id: 1, emoji: '🧘‍♀️', text: 'Знайти внутрішній спокій та знизити тривожність' },
  { id: 2, emoji: '🚀', text: 'Повернути мотивацію та почати діяти' },
  { id: 3, emoji: '💖', text: 'Навчитись приймати себе без осуду' },
  { id: 4, emoji: '🤝', text: 'Покращити відносини та встановити здорові межі' },
  { id: 5, emoji: '💪', text: 'Бути стійким у змінах та протистояти стресу' },
  { id: 6, emoji: '🎯', text: 'Усвідомити свої бажання і не жити «чужим життям»' }
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Як довго діє подарунковий сертифікат?',
    answer:
      'Сертифікат дійсний протягом 3 місяців з моменту придбання. Якщо потрібно — можна подовжити, звернувшись до служби підтримки.'
  },
  {
    id: 'faq-2',
    question: 'Чи можна передати сертифікат іншій людині?',
    answer:
      'Так, сертифікат можна передати тому, хто потребує допомоги. Просто надішліть код отримувачу.'
  },
  {
    id: 'faq-3',
    question: 'Чи можна обрати будь-якого фахівця?',
    answer:
      'Так, сертифікат дозволяє обрати будь-якого доступного психолога на платформі.'
  },
  {
    id: 'faq-4',
    question: 'Чи можна повернути кошти за сертифікат?',
    answer:
      'На жаль, подарункові сертифікати не підлягають поверненню згідно з політикою сервісу.'
  }
];
