import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Pagination } from 'react-bootstrap';
import {
  getDataDetailMovieAction,
  getDataMovieNowPlayingAction,
  searchMovieAction,
} from '../actions';
import { formatDate } from '../../../utils/Date';
import DetailMovie from './DetailMovie';

import img_card from '../../../assets/images/image_card.jpg';
import { GET_PAGE } from '../../../constant';

const DataMovieNowPlaying = () => {
  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [show, setShow] = useState(false);
  const [total_pages, setTotalPages] = useState(1);
  const {
    dataMoviePopular,
    isLoadingPopularMovie,
    isLoadingDetail,
    dataDetailMovie,
    page,
    isSearch,
    keyword,
  } = useSelector((state) => state.movies);

  const {
    results,
    total_results,
    total_pages: totalPageApi,
  } = dataMoviePopular;

  useEffect(() => {
    setShowSkeleton(true);
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
    if (!isSearch && keyword.length === 0) {
      dispatch(getDataMovieNowPlayingAction(page));
    } else {
      dispatch(searchMovieAction(keyword, page));
    }
    return () => clearTimeout(timeoutId);
  }, [page, dispatch, isSearch]);

  useEffect(() => {
    if (total_results === 0) {
      setTotalPages(1);
    } else if (totalPageApi > 500) {
      setTotalPages(500);
    } else {
      setTotalPages(totalPageApi);
    }
  }, [total_results, totalPageApi]);

  const handleDetail = (idMovie) => {
    setShow(true);
    dispatch(getDataDetailMovieAction(idMovie));
  };

  const getMiddlePages = (current, total) => {
    const pages = [];

    if (total <= 7) {
      for (let i = 2; i < total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 2; i <= 5; i++) {
          pages.push(i);
        }
      } else if (current >= total - 3) {
        for (let i = total - 4; i < total; i++) {
          pages.push(i);
        }
      } else {
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <>
      <div>
        <h2 className="title-section">Popular Movies</h2>

        <div className="content-home">
          {isLoadingPopularMovie || showSkeleton ? (
            Array.from({ length: 10 }).map((_, index) => (
              <Card key={index} className="card-skeleton">
                {[200, 40, 60, 20, 40].map((height, i) => (
                  <div key={i} className="card-skeleton-bar"></div>
                ))}
              </Card>
            ))
          ) : results && results.length > 0 ? (
            results.map((data) => (
              <Card key={data.id} className="card-container">
                <Card.Img
                  variant="top"
                  src={
                    data.poster_path
                      ? `${process.env.REACT_APP_IMG_URL}${data.poster_path}`
                      : img_card
                  }
                  className="card-img"
                />
                <Card.Body className="card-body mx-1">
                  <Card.Title className="card-title">
                    {data.original_title}
                  </Card.Title>
                  <Card.Text className="card-text">
                    {data.overview.split(' ').slice(0, 20).join(' ')}
                    {data.overview.split(' ').length > 20 && '...'}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="card-footer mx-1">
                  <Card.Text className="card-text-footer">
                    <b>Release:</b>{' '}
                    {data.release_date ? formatDate(data.release_date) : ''}
                  </Card.Text>
                  <Button
                    size="sm"
                    variant="danger"
                    className="card-button"
                    onClick={() => handleDetail(data.id)}
                  >
                    Detail
                  </Button>
                </Card.Footer>
              </Card>
            ))
          ) : (
            <div className="nodata-container">
              <h3 className="title-nodata">No Movies Found</h3>
              <p className="desc-nodata">
                Try searching with a different keyword.
              </p>
            </div>
          )}
        </div>

        <div className="pagination-container">
          <div className="pagination-showpage">
            Showing page {page} of {total_pages} | Total: {total_results} movies
          </div>

          <Pagination>
            {page > 1 && (
              <Pagination.Prev
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: page - 1,
                  })
                }
                className="nav-style"
              />
            )}

            <Pagination.Item
              active={page === 1}
              onClick={() =>
                dispatch({
                  type: GET_PAGE,
                  payload: 1,
                })
              }
              className={`pagination-item ${1 === page ? 'active' : ''}`}
            >
              1
            </Pagination.Item>

            {page > 4 && (
              <Pagination.Item
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: Math.max(page - 3, 1),
                  })
                }
                className="ellipsis-style"
              >
                ...
              </Pagination.Item>
            )}

            {getMiddlePages(page, total_pages).map((pageItem) => (
              <Pagination.Item
                key={pageItem}
                active={page === pageItem}
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: pageItem,
                  })
                }
                className={`pagination-item ${
                  page === pageItem ? 'active' : ''
                }`}
              >
                {pageItem}
              </Pagination.Item>
            ))}

            {page < total_pages - 3 && (
              <Pagination.Item
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: Math.min(page + 3, total_pages),
                  })
                }
                className="ellipsis-style"
              >
                ...
              </Pagination.Item>
            )}

            {total_pages > 1 && (
              <Pagination.Item
                active={page === total_pages}
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: total_pages,
                  })
                }
                className={`pagination-item ${
                  total_pages === page ? 'active' : ''
                }`}
              >
                {total_pages}
              </Pagination.Item>
            )}

            {page < total_pages && (
              <Pagination.Next
                onClick={() =>
                  dispatch({
                    type: GET_PAGE,
                    payload: page + 1,
                  })
                }
                className="nav-style"
              />
            )}
          </Pagination>
        </div>
      </div>

      <DetailMovie
        show={show}
        setShow={setShow}
        dataDetail={dataDetailMovie}
        isLoadingDetail={isLoadingDetail}
      />
    </>
  );
};

export default DataMovieNowPlaying;
