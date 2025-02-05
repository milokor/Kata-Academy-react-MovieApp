export const movieRatingColor = (
  rating: number,
): { borderColor: string } | undefined => {
  if (Math.trunc(rating) < 4) {
    return { borderColor: '#E90000' };
  }
  if (Math.trunc(rating) < 6) {
    return { borderColor: '#E97E00' };
  }
  if (Math.trunc(rating) < 8) {
    return { borderColor: '#E9D100' };
  }
  if (Math.trunc(rating) > 7) {
    return { borderColor: '#66E900' };
  }
  return undefined;
};
