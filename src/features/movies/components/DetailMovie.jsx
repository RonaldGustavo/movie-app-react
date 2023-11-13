import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { formatDate } from "../../../utils/Date";

const DetailMovie = ({ show, setShow, dataDetail, isLoadingDetail }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const handleClose = () => {
    setShow(false);
    setShowSkeleton(true);
  };
  useEffect(() => {
    // Hide skeleton after 1500ms (1.5 seconds)
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 800);

    // Clear the timeout when the component is unmounted
    return () => clearTimeout(timeoutId);
  }, [dataDetail]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="modal-lg"
      backdrop={false}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ textShadow: "0.5px 1px 2px" }}>
          Detail Movie
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container-fluid">
          {isLoadingDetail || showSkeleton ? (
            <Row>
              <Col lg={4}>
                <div
                  className="card-skeleton"
                  style={{
                    width: "100%",
                    height: "400px",
                    backgroundColor: "#202020",
                  }}
                ></div>
              </Col>
              <Col lg={8}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    className="card-skeleton"
                    style={{
                      width: "100%",
                      height: "52.5px",
                      backgroundColor: "#202020",
                      marginBottom: "5px",
                    }}
                  ></div>
                ))}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={4}>
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${dataDetail.poster_path}`}
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                  alt={dataDetail.title}
                />
              </Col>
              <Col lg={8}>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>ID</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="id"
                    aria-describedby="basic-addon1"
                    value={dataDetail.id}
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Title</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="title"
                    aria-describedby="basic-addon1"
                    value={dataDetail.title}
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Genre</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="genres"
                    aria-describedby="basic-addon1"
                    value={
                      dataDetail.genres &&
                      dataDetail.genres.map((data) => data.name).join(", ")
                    }
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Overview</b>
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    aria-label="overview"
                    aria-describedby="basic-addon1"
                    value={dataDetail.overview}
                    style={{ overflow: "scroll" }}
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Release Date</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="title"
                    aria-describedby="basic-addon1"
                    value={formatDate(dataDetail.release_date)}
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Status</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="release date"
                    aria-describedby="basic-addon1"
                    value={`${
                      dataDetail.status === "Released"
                        ? "Released ✅"
                        : "Not Released ❌"
                    }`}
                    readOnly
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Text
                    id="basic-addon1"
                    style={{ width: "120px", color: "red" }}
                  >
                    <b>Rating</b>
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="title"
                    aria-describedby="basic-addon1"
                    value={`${parseFloat(dataDetail?.vote_average).toFixed(
                      1
                    )}⭐`}
                    readOnly
                  />
                </InputGroup>
              </Col>
            </Row>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailMovie;
