import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { LocationForEmpty } from './constants';
dayjs.extend(calendar);

export const formatPrice = (price: number, regionCurrency = 'EUR') => {
  if (!price) return 'free';
  return Intl.NumberFormat('ru', {
    style: 'currency',
    currency: regionCurrency,
  }).format(price);
};

export const subtractPercentage = (price: number, percent: number) =>
  price - (price / 100) * percent;

export const formatDate = (date: string) => {
  return dayjs(date).calendar(null, {
    sameDay: '[Today at] h:mm A',
    nextDay: '[Tomorrow at] h:mm A',
    nextWeek: 'dddd [at] h:mm A',
    lastDay: '[Yesterday at] h:mm A',
    lastWeek: '[Last] dddd [at] h:mm A',
    sameElse: 'MMMM D | YYYY',
  });
};

export const getLocationWhenEmpty = () => {
  const index = Math.floor(Math.random() * LocationForEmpty.length);
  return LocationForEmpty[index];
};
