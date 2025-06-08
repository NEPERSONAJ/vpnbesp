export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  currency: string;
  period: string;
  periodText: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  discount?: number;
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    title: '1 месяц',
    price: 100,
    currency: 'RUB',
    period: 'мес',
    periodText: '/ мес',
    features: [
      'Неограниченное количество устройств',
      'Неограниченная скорость',
      'Защита конфиденциальности',
      'Техническая поддержка 24/7',
    ],
    buttonText: 'Выбрать',
  },
  {
    id: 'semi-annual',
    title: '6 месяцев',
    price: 550,
    currency: 'RUB',
    period: '6 мес',
    periodText: '/ 6 мес',
    features: [
      'Неограниченное количество устройств',
      'Неограниченная скорость',
      'Защита конфиденциальности',
      'Техническая поддержка 24/7',
      'Экономия 50 рублей',
    ],
    popular: true,
    buttonText: 'Выбрать',
    discount: 8,
  },
  {
    id: 'annual',
    title: '12 месяцев',
    price: 1100,
    currency: 'RUB',
    period: 'год',
    periodText: '/ год',
    features: [
      'Неограниченное количество устройств',
      'Неограниченная скорость',
      'Защита конфиденциальности',
      'Техническая поддержка 24/7',
      'Экономия 100 рублей',
    ],
    buttonText: 'Выбрать',
    discount: 17,
  },
];

export const featureList = [
  {
    title: 'Безопасность данных',
    description: 'Шифрование по военным стандартам защищает ваши данные от посторонних глаз',
    icon: 'shield',
  },
  {
    title: 'Высокая скорость',
    description: 'Наша сеть оптимизирована для быстрого и стабильного соединения',
    icon: 'bolt',
  },
  {
    title: 'Множество серверов',
    description: 'Выбирайте из серверов в разных странах для оптимальной производительности',
    icon: 'globe',
  },
  {
    title: 'Поддержка всех устройств',
    description: 'Используйте на компьютерах, смартфонах, планшетах и других устройствах',
    icon: 'devices',
  },
  {
    title: 'Удобный интерфейс',
    description: 'Простое и интуитивно понятное управление для пользователей любого уровня',
    icon: 'interface',
  },
  {
    title: 'Круглосуточная поддержка',
    description: 'Наша команда готова помочь вам в любое время дня и ночи',
    icon: 'support',
  },
]; 