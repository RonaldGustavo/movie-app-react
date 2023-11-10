import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataMovieNowPlayingAction } from "../actions";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const DataMovieNowPlaying = () => {
  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    dispatch(getDataMovieNowPlayingAction());

    // Hide skeleton after 1500ms (1.5 seconds)
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const { dataMovieNowPlaying, isLoadingMovieNowPlaying } = useSelector(
    (state) => state.movies
  );

  console.log(dataMovieNowPlaying);

  // Calculate the maximum height based on the content
  const maxHeight =
    Math.max(...dataMovieNowPlaying.map((data) => data.overview.length)) + 90;

  return (
    <>
      <div>
        <h2 style={{ textAlign: "left", marginBottom: "20px" }}>Now Playing</h2>
        {isLoadingMovieNowPlaying || showSkeleton ? (
          <Row>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "black",
                    height: `${600}px`,
                  }}
                  className="card-skeleton"
                >
                  <SkeletonTheme color="#202020" highlightColor="#444">
                    <Skeleton height={200} />
                    <Card.Body style={{ height: "100%" }}>
                      <Card.Title>
                        <Skeleton height={20} />
                      </Card.Title>
                      <Card.Text>
                        <Skeleton count={3} />
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Title>
                        <Skeleton height={15} />
                      </Card.Title>
                    </Card.Footer>
                  </SkeletonTheme>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            {dataMovieNowPlaying.map((data) => (
              <Col key={data.id} xs={12} sm={6} md={4} lg={3} xl={3}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "black",
                    height: `${maxHeight}px`, // Set a fixed height
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={`${process.env.REACT_APP_IMG_URL}${data.poster_path}`}
                    style={{ height: "100%", objectFit: "cover" }}
                  />
                  <Card.Body style={{ height: "100%" }}>
                    <Card.Title style={{ color: "red", textAlign: "center" }}>
                      {data.original_title}
                    </Card.Title>
                    <Card.Text
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {data.overview.split(" ").slice(0, 20).join(" ")}
                      {data.overview.split(" ").length > 20 && "..."}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Card.Title style={{ color: "white" }}>
                      {data.release_date}
                    </Card.Title>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default DataMovieNowPlaying;
