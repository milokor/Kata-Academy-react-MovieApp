import { format } from 'date-fns';

export const timeParse = (text: string): string => {
  if (text.length === 0) {
    return '';
  }
  return format(text, 'd MMMM yyyy');
};
