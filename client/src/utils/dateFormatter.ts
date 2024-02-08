import dayjs from 'dayjs';

export const formatAPIDate = (date: string): string => {
  // Removes zero time-zone because it causes
  // an adition of one day in the final string
  return dayjs(date.replace('Z', '')).format('DD/MM/YYYY');
};
