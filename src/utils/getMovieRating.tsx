export const getMovieRating = (movieId: number): number | undefined => {
  const ratedMovies = JSON.parse(localStorage.getItem('ratedMovie') || '{}');

  return ratedMovies[movieId] ?? undefined;
};
