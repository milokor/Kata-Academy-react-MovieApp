import { Pagination, Alert, Input } from 'antd';
import './App.css';
import { Offline, Online } from 'react-detect-offline';
import React, { useState, useEffect, JSX } from 'react';
import { debounce } from 'lodash';
import { TabHeader } from '../TabHeader/TabHeader';
import {
  guestId,
  genresApi,
  apiMovie,
  ratingList,
} from '../../utils/ApiMovieDb';
import { Appcontext } from '../Context/Appcontext';
import type { Movie, СontextApp, RatingMovie } from '../../types/types';
import { FilmsList } from '../FilmsList/FilmsList';

export const App: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [apiMovieList, setApiMovieList] = useState<Movie[]>([]);
  const [apiMovieListRated, setApiMovieListRated] = useState<Movie[]>([]);
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(1);
  const [pageCurrent, setPageCurrent] = useState<number>(1);
  const [genresList, setGenreList] = useState<СontextApp[]>([]);
  const [tabsPage, setTabsPage] = useState<number>(1);
  const setObjectRatingMovie = useState<RatingMovie>({})[1];
  const [pageCountRate, setPageCountRate] = useState<number>(1);
  const onInputText = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.trim()) {
      setInputText(event.target.value);
      setPageCurrent(1);
    } else {
      setInputText('');
    }
  };

  const apiGetFunction = async (): Promise<void> => {
    try {
      setErrorAlert(false);
      setLoadingStatus(true);
      const apiGet = await apiMovie(inputText, pageCurrent);
      setApiMovieList(apiGet.results);
      setTotalResults(apiGet.total_results);
      setPageCount(apiGet.total_pages);
    } catch {
      setErrorAlert(true);
    } finally {
      setLoadingStatus(false);
    }
  };

  useEffect(() => {
    const apiGetGenres = async (): Promise<void> => {
      try {
        setLoadingStatus(true);
        const apiGetAwait = await genresApi();
        setGenreList(apiGetAwait.genres);
      } catch {
        setErrorAlert(true);
      } finally {
        setLoadingStatus(false);
      }
    };
    const API_KEYS = {
      EXPIRES_AT: 'expires_at',
      GUEST_SESSION_ID: 'guest_session_id',
      RATEDMOVIE: 'ratedMovie',
    };

    const apiGetGuestId = async (): Promise<void> => {
      try {
        setLoadingStatus(true);
        const expiresAt = Number(localStorage.getItem(API_KEYS.EXPIRES_AT));
        const guestSessionId = localStorage.getItem(API_KEYS.GUEST_SESSION_ID);

        if (!guestSessionId || expiresAt <= Date.now()) {
          const response = await guestId();
          if (response?.success) {
            const newExpiresAt = Date.parse(response.expires_at);
            localStorage.setItem(API_KEYS.EXPIRES_AT, newExpiresAt.toString());
            localStorage.setItem(
              API_KEYS.GUEST_SESSION_ID,
              response.guest_session_id,
            );
            localStorage.removeItem(API_KEYS.RATEDMOVIE);
          } else {
            localStorage.removeItem(API_KEYS.EXPIRES_AT);
            localStorage.removeItem(API_KEYS.GUEST_SESSION_ID);
            setErrorAlert(true);
          }
        }
      } catch {
        localStorage.removeItem(API_KEYS.EXPIRES_AT);
        localStorage.removeItem(API_KEYS.GUEST_SESSION_ID);
        setErrorAlert(true);
      } finally {
        setLoadingStatus(false);
      }
    };
    const ratedMovies = JSON.parse(localStorage.getItem('ratedMovie') || '{}');
    if (ratedMovies) {
      setObjectRatingMovie(ratedMovies);
    }

    apiGetGenres();
    apiGetGuestId();
  }, []);

  useEffect(() => {
    const apiGetRating = async (): Promise<void> => {
      try {
        setLoadingStatus(true);
        const apiGet = await ratingList();
        setApiMovieListRated(apiGet.results);
        setPageCountRate(apiGet.total_pages);
      } catch {
        setErrorAlert(true);
      } finally {
        setLoadingStatus(false);
      }
    };
    apiGetRating();
    if (tabsPage === 2) {
      setApiMovieList([]);
      setPageCount(1);
    }
  }, [tabsPage]);

  const debounceApiGet = debounce(apiGetFunction, 1000);
  useEffect(() => {
    debounceApiGet();
  }, [inputText, pageCurrent]);

  const renderContentApp = (tabsPageNumber: number): JSX.Element | null => {
    const paginationProps = {
      align: 'center' as const,
      total: pageCount,
      onChange: setPageCurrent,
      defaultPageSize: 20,
      pageSizeOptions: [20],
    };

    const filmsListContentProps = {
      apiMovieList,
      errorAlert,
      loadingStatus,
      totalResults,
      inputText,
      setObjectRatingMovie,
    };

    const filmsListContent = (
      <FilmsList
        apiMovieList={apiMovieList}
        errorAlert={errorAlert}
        loadingStatus={loadingStatus}
        totalResults={totalResults}
        inputText={inputText}
        setObjectRatingMovie={setObjectRatingMovie}
      />
    );

    const contentMap: Record<number, JSX.Element> = {
      1: (
        <>
          <Input
            placeholder="Type to search..."
            allowClear
            size="large"
            onChange={onInputText}
            disabled={loadingStatus}
          />
          {filmsListContent}
          {totalResults !== 0 && <Pagination {...paginationProps} />}
        </>
      ),
      2: (
        <>
          <FilmsList
            {...filmsListContentProps}
            apiMovieList={apiMovieListRated}
          />
          <Pagination {...paginationProps} total={pageCountRate} />
        </>
      ),
    };

    return contentMap[tabsPageNumber];
  };

  return (
    <div>
      <Online>
        <div style={{ maxWidth: 938, margin: 'auto' }}>
          <Appcontext.Provider value={genresList}>
            <TabHeader setTabsPage={setTabsPage} />
            {renderContentApp(tabsPage)}
          </Appcontext.Provider>
        </div>
      </Online>
      <Offline>
        <div
          style={{
            maxWidth: 938,
            margin: 'auto',
          }}
        >
          <Alert type="error" message="No internet" />
        </div>
      </Offline>
    </div>
  );
};
