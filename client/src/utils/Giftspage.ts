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

const giftPrice = 1000;
export const getPrice = (amount: number, discount: number) => {
  const startPrice = amount * giftPrice;

  return startPrice - startPrice / 100 * discount
};

export const GIFT_OPTIONS = [
  {
    id: 1,
    amount: 1,
    discount: 0,
    title: 'Індивідуальний сеанс',
    subtitle: 'Знайомство зі спеціалістом',
    description: 'Перший крок до покращення самопочуття — обговорити запит з фахівцем і визначити план дій.'
  },
  {
    id: 2,
    amount: 3,
    discount: 5,
    title: 'Індивідуальних сеанси',
    subtitle: 'Початок шляху',
    description: 'Цей формат дозволить створити довіру, зануритися в процес і відчути перші зрушення.'
  },
  {
    id: 3,
    amount: 6,
    discount: 10,
    title: 'Індивідуальних сеансів',
    subtitle: 'Перші результати',
    description: 'Регулярна робота з фахівцем допоможе краще зрозуміти себе та стабілізувати емоційний стан.'
  },
  {
    id: 4,
    amount: 12,
    discount: 15,
    title: 'Індивідуальних сеансів',
    subtitle: 'Найвигідніші умови',
    description: 'Повноцінний цикл роботи з спеціалістом для глибокого пропрацювання запиту і закріплення змін.'
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
