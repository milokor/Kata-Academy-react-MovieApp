import React from 'react';

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
  ok?: boolean;
}
export interface GenresResponse {
  genres: СontextApp[];
}
export interface GuestResponse {
  expires_at: string;
  guest_session_id: string;
  success: boolean;
}
export interface Movie {
  id: number;
  poster_path?: string | null;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  genre_ids: number[];
}

export interface MyComponentProps {
  apiMovieList: Movie[];
  errorAlert: boolean;
  loadingStatus: boolean;
  totalResults: number;
  inputText: string;
  setObjectRatingMovie: React.Dispatch<React.SetStateAction<RatingMovie>>;
}

export interface СontextApp {
  id: number;
  name: string;
}

export interface TabsPropsHeader {
  setTabsPage: React.Dispatch<React.SetStateAction<number>>;
}
export interface RatingMovie {
  [key: string]: number;
}
