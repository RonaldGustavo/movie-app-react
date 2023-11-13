import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataDetailMovieAction,
  getDataMovieNowPlayingAction,
} from "../actions";
import { Button, Card, Col, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { formatDate } from "../../../utils/Date";
import { toast } from "react-toastify";
import DetailMovie from "./DetailMovie";

const DataMovieNowPlaying = () => {
  const dispatch = useDispatch();
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    dispatch(getDataMovieNowPlayingAction());

    // Hide skeleton after 1500ms (1.5 seconds)
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [dispatch]);

  const {
    dataMovieNowPlaying,
    isLoadingMovieNowPlaying,
    isLoadingDetail,
    dataDetailMovie,
  } = useSelector((state) => state.movies);
  console.log("data detail: ", dataDetailMovie);

  console.log(dataMovieNowPlaying);

  const handleDetail = (idMovie) => {
    setShow(true);
    dispatch(getDataDetailMovieAction(idMovie));
  };

  return (
    <>
      <div>
        <h2
          style={{
            textAlign: "left",
            margin: "20px 0px",
            textShadow: "2px 2px 4px",
            color: "#ffffff",
          }}
        >
          Now Playing
        </h2>
        {isLoadingMovieNowPlaying || showSkeleton ? (
          <Row>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "black",
                    minHeight: `${500}px`,
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
                      <Card.Text>
                        <Skeleton height={15} />
                      </Card.Text>
                    </Card.Footer>
                  </SkeletonTheme>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Row>
            {dataMovieNowPlaying &&
              dataMovieNowPlaying.map((data) => (
                <Col key={data.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Card
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "black",
                      minHeight: `700px`,
                      borderRadius: "10px",
                    }}
                  >
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_IMG_URL}${data.poster_path}`}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        width: "100%",
                      }}
                    />
                    <Card.Body style={{ minHeight: "100px" }}>
                      <Card.Title
                        style={{
                          color: "red",
                          minHeight: "40px",
                          fontSize: "1.1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                        }}
                      >
                        {data.original_title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          fontSize: "0.8rem",
                          color: "#ffffff",
                        }}
                      >
                        {data.overview.split(" ").slice(0, 20).join(" ")}
                        {data.overview.split(" ").length > 20 && "..."}
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <Card.Text style={{ color: "white", fontSize: "0.8rem" }}>
                        <b>Release Date:</b> {formatDate(data.release_date)}
                      </Card.Text>
                      <Button
                        style={{ width: "100%" }}
                        onClick={() => handleDetail(data.id)}
                      >
                        Detail
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        )}
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
