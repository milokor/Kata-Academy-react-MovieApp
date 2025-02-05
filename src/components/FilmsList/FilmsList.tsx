import './FilmsList.css';
import React, { JSX, useContext } from 'react';
import { Spin, Layout, Alert, Rate } from 'antd';
import { textSlice } from '../../utils/textSlice';
import { timeParse } from '../../utils/timeParse';
import type { MyComponentProps, СontextApp } from '../../types/types';
import { movieRatingColor } from '../../utils/movieRatingColor';
import { Appcontext } from '../Context/Appcontext';
import { addRating } from '../../utils/addRating';
import { getMovieRating } from '../../utils/getMovieRating';
/* eslint-disable camelcase */
export const FilmsList: React.FC<MyComponentProps> = ({
  apiMovieList,
  errorAlert,
  loadingStatus,
  totalResults,
  inputText,
  setObjectRatingMovie,
}) => {
  const genresListContext = useContext<СontextApp[]>(Appcontext);

  const collectionMap = apiMovieList.map(
    ({
      poster_path,
      title,
      vote_average,
      overview,
      id,
      release_date,
      genre_ids,
    }) => (
      <div className="movie-card" key={id}>
        <div className="poster-container">
          <img
            src={`https://media.themoviedb.org/t/p/original/${poster_path === null ? '' : poster_path}`}
            alt="poster"
            className="poster"
          />
        </div>
        <div className="right-container">
          <div className="title-rating">
            <p className="movie-title">{textSlice(title, 30)}</p>
            <div
              className="rating-badge"
              style={movieRatingColor(vote_average)}
            >
              <span className="rateColor">
                {vote_average === 10 ? vote_average : vote_average.toFixed(1)}
              </span>
            </div>
          </div>
          <div className="content">
            <span className="release-date">{timeParse(release_date)}</span>
            <div className="metadata">
              {genre_ids.map((itemGenres) => {
                const genre = genresListContext.find(
                  (item) => item.id === itemGenres,
                );

                return genre ? (
                  <span className="genre-tag" key={genre.id}>
                    {genre.name}
                  </span>
                ) : null;
              })}
            </div>
            <p className="synopsis">{textSlice(overview, 150)}</p>
            <div className="stars-container">
              <Rate
                count={10}
                onChange={(stars) => {
                  addRating(id, stars, setObjectRatingMovie);
                }}
                value={getMovieRating(id)}
              />
            </div>
          </div>
        </div>
      </div>
    ),
  );

  const renderContent = (): JSX.Element => {
    if (loadingStatus) {
      return (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      );
    }

    if (errorAlert) {
      return (
        <div className="alert-container">
          <Alert
            type="warning"
            message="We can't let you in right now. Use a VPN"
          />
        </div>
      );
    }
    if (!loadingStatus && totalResults === 0 && inputText !== '') {
      return (
        <div className="alert-container">
          <Alert type="warning" message="Not found" />
        </div>
      );
    }
    return <div className="container">{collectionMap}</div>;
  };

  return <Layout style={{ background: 'white' }}>{renderContent()}</Layout>;
};
