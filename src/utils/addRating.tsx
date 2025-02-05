import React from 'react';
import type { RatingMovie } from '../types/types';

export const addRating = async (
  movieId: number,
  star: number,
  setMovie: React.Dispatch<React.SetStateAction<RatingMovie>>,
): Promise<void> => {
  const guestID = localStorage.getItem('guest_session_id');
  if (guestID && star !== 0) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzkzZDAzYzUwYTA4ZjhhOGMxY2NmNTQ2MTA2MmM5NyIsIm5iZiI6MTczNzY1MTQ0MS4xMzEsInN1YiI6IjY3OTI3NGYxMTgxMDc2ODdkYmEwMzYyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5F-UJzVFgGG3W_1yHBtsKMmo4e_4hLM_YsXR81bmi7k',
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: movieId,
        value: star,
      }),
    };

    const apiPost = fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestID}`,
      options,
    );

    if ((await apiPost).ok) {
      setMovie((prev) => {
        const updatedMovies = { ...prev, [movieId]: star };
        localStorage.setItem('ratedMovie', JSON.stringify(updatedMovies));
        return updatedMovies;
      });
    }
  }
};
