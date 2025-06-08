export const SEO_CONFIG = {
  // Основные SEO-настройки
  defaultTitle: 'besplatnovpn — Бесплатный и безопасный VPN для интернета',
  titleTemplate: '%s | besplatnovpn',
  description: 'besplatnovpn — бесплатный VPN-сервис с высоким уровнем безопасности. Открывайте YouTube, ChatGPT, Midjourney и другие сервисы свободно, быстро и конфиденциально.',

  // Основной домен (в продакшене замените на реальный)
  siteUrl: 'https://besplatnovpn.ru',
  
  // Социальные сети и Open Graph
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    site_name: 'besplatnovpn',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VPN1 - Надежное VPN решение',
      },
    ],
  },
  
  // Телеграм каналы
  telegram: {
    bot: 'https://t.me/besplatnovpn',
    support: 'https://t.me/besplatnovpn',
    channel: 'https://t.me/besplatnovpn',
  },
  
  // Twitter карточка
  twitter: {
    handle: '@besplatnovpn',
    site: '@besplatnovpn',
    cardType: 'summary_large_image',
  },
  
  // Дополнительные ключевые слова (хотя их значимость уменьшилась)
  keywords: 'бесплатный vpn, vpn для youtube, vpn для chatgpt, vpn midjourney, vpn claude, быстрый vpn, анонимность, защита данных, vpn 2025, впн без регистрации, впн бесплатно',

  // Коды для аналитики
  analytics: {
    // Код Яндекс Метрики
    yandexMetrikaId: '00000000', // Замените на реальный ID
  },
  
  // Дополнительные мета-теги
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'author',
      content: 'VPN1',
    },
    {
      name: 'robots',
      content: 'index, follow',
    },
  ],
  
  // Canonical URL (для предотвращения дублирования контента)
  canonical: 'https://besplatnovpn.ru',
  
  // Иконка сайта
  favicon: '/favicon.ico',
};

// Адреса страниц для sitemap
export const SITE_ROUTES = [
  {
    url: '/',
    changefreq: 'monthly',
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
];

// Словарь метаданных для каждой страницы
export const PAGE_METADATA = {
  home: {
    title: 'Бесплатный VPN для YouTube и ChatGPT',
    description: 'besplatnovpn — безопасный VPN-сервис с высокой скоростью и конфиденциальностью. Работает с YouTube, ChatGPT, Midjourney, Claude и другими платформами.',
  },
  privacy: {
    title: 'Политика конфиденциальности',
    description: 'Мы защищаем вашу конфиденциальность и не храним личные данные.',
  },
  terms: {
    title: 'Условия использования',
    description: 'Ознакомьтесь с нашими условиями использования VPN-сервиса besplatnovpn.',
  },
}; 