import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataDetailMovieAction,
  getDataMovieNowPlayingAction,
} from "../actions";
import { Button, Card, Col, Row } from "react-bootstrap";
import { formatDate } from "../../../utils/Date";
import DetailMovie from "./DetailMovie";

// image
import img_card from "../../../assets/images/image_card.jpg";

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
    dataMoviePopular,
    isLoadingPopularMovie,
    isLoadingDetail,
    dataDetailMovie,
  } = useSelector((state) => state.movies);
  console.log("data detail: ", dataDetailMovie);
  console.log("loading", isLoadingPopularMovie);

  console.log(dataMoviePopular);

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
          Popular Movie
        </h2>

        {isLoadingPopularMovie || showSkeleton ? (
          <Row>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "black",
                    minHeight: `${600}px`,
                  }}
                  className="card-skeleton"
                >
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "450px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "55px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "70px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "60px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : dataMoviePopular && dataMoviePopular.length > 0 ? (
          <Row>
            {dataMoviePopular.map((data) => (
              <Col key={data.id} xs={12} sm={6} md={6} lg={4} xl={3}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "black",
                    minHeight: `725px`,
                    borderRadius: "10px",
                  }}
                >
                  {" "}
                  {data.poster_path ? (
                    <Card.Img
                      variant="top"
                      src={`${process.env.REACT_APP_IMG_URL}${data.poster_path}`}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <Card.Img
                      variant="top"
                      src={img_card}
                      style={{
                        objectFit: "contain",
                        objectPosition: "center",
                        width: "100%",
                      }}
                    />
                  )}
                  <Card.Body
                    style={{
                      minHeight: "100px",
                    }}
                  >
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
                      <b>Release Date:</b>{" "}
                      {data.release_date ? formatDate(data.release_date) : ""}
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
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <h3 style={{ color: "red", fontSize: "3.5rem" }}>
              DATA NOT FOUND!
            </h3>
          </div>
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
