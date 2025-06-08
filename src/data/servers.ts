import { ServerLocation } from '@/components/ui/ServerMap';

export const vpnServers: ServerLocation[] = [
  {
    id: 'de-berlin',
    country: 'Германия',
    city: 'Берлин',
    latitude: 52.5200,
    longitude: 13.4050,
    isActive: true
  },
  {
    id: 'nl-amsterdam',
    country: 'Нидерланды',
    city: 'Амстердам',
    latitude: 52.3676,
    longitude: 4.9041
  },
  {
    id: 'se-stockholm',
    country: 'Швеция',
    city: 'Стокгольм',
    latitude: 59.3293,
    longitude: 18.0686
  },
  {
    id: 'fi-helsinki',
    country: 'Финляндия',
    city: 'Хельсинки',
    latitude: 60.1699,
    longitude: 24.9384
  },
  {
    id: 'us-newyork',
    country: 'США',
    city: 'Нью-Йорк',
    latitude: 40.7128,
    longitude: -74.0060
  },
  {
    id: 'us-losangeles',
    country: 'США',
    city: 'Лос-Анджелес',
    latitude: 34.0522,
    longitude: -118.2437
  },
  {
    id: 'tr-istanbul',
    country: 'Турция',
    city: 'Стамбул',
    latitude: 41.0082,
    longitude: 28.9784
  },
  {
    id: 'kz-almaty',
    country: 'Казахстан',
    city: 'Алматы',
    latitude: 43.2220,
    longitude: 76.8512
  }
];

export const getServerById = (id: string): ServerLocation | undefined => {
  return vpnServers.find(server => server.id === id);
};

export const getServerByCountryAndCity = (country: string, city: string): ServerLocation | undefined => {
  return vpnServers.find(server => server.country === country && server.city === city);
};

export const getActiveServer = (): ServerLocation | undefined => {
  return vpnServers.find(server => server.isActive);
}; 