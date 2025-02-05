import type {
  GenresResponse,
  MovieResponse,
  GuestResponse,
} from '../types/types';

export const apiMovie = async (
  inputText: string,
  page: number,
): Promise<MovieResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkzZDAzYzUwYTA4ZjhhOGMxY2NmNTQ2MTA2MmM5NyIsIm5iZiI6MTczNzY1MTQ0MS4xMzEsInN1YiI6IjY3OTI3NGYxMTgxMDc2ODdkYmEwMzYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-UJzVFgGG3W_1yHBtsKMmo4e_4hLM_YsXR81bmi7k',
    },
  };
  const apiGetUrl = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputText}&include_adult=false&language=en-US&page=${page}`,
    options,
  );

  return apiGetUrl.json();
};

export const genresApi = async (): Promise<GenresResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkzZDAzYzUwYTA4ZjhhOGMxY2NmNTQ2MTA2MmM5NyIsIm5iZiI6MTczNzY1MTQ0MS4xMzEsInN1YiI6IjY3OTI3NGYxMTgxMDc2ODdkYmEwMzYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-UJzVFgGG3W_1yHBtsKMmo4e_4hLM_YsXR81bmi7k',
    },
  };

  const apiGetGenres = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    options,
  );
  return apiGetGenres.json();
};

export const guestId = async (): Promise<GuestResponse> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkzZDAzYzUwYTA4ZjhhOGMxY2NmNTQ2MTA2MmM5NyIsIm5iZiI6MTczNzY1MTQ0MS4xMzEsInN1YiI6IjY3OTI3NGYxMTgxMDc2ODdkYmEwMzYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-UJzVFgGG3W_1yHBtsKMmo4e_4hLM_YsXR81bmi7k',
    },
  };

  const apiGuestGet = await fetch(
    'https://api.themoviedb.org/3/authentication/guest_session/new',
    options,
  );
  return apiGuestGet.json();
};

export const ratingList = async (): Promise<MovieResponse> => {
  const guestSessionId = localStorage.getItem('guest_session_id');

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkzZDAzYzUwYTA4ZjhhOGMxY2NmNTQ2MTA2MmM5NyIsIm5iZiI6MTczNzY1MTQ0MS4xMzEsInN1YiI6IjY3OTI3NGYxMTgxMDc2ODdkYmEwMzYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-UJzVFgGG3W_1yHBtsKMmo4e_4hLM_YsXR81bmi7k',
    },
  };

  const response = await fetch(
    `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
    options,
  );
  return response.json();
};
