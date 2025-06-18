import { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Modal, Row } from 'react-bootstrap';
import { formatDate } from '../../../utils/Date';

const DetailMovie = ({ show, setShow, dataDetail, isLoadingDetail }) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  const handleClose = () => {
    setShow(false);
    setShowSkeleton(true);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [dataDetail]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="modal-lg"
      backdrop={false}
      centered
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title className="title-detail">Detail Movie</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="container-fluid">
          {isLoadingDetail || showSkeleton ? (
            <Row>
              <Col lg={4}>
                <div className="card-skeleton card-skeleton-detail" />
              </Col>
              <Col lg={8}>
                {Array.from({ length: 7 }).map((_, index) => (
                  <div
                    key={index}
                    className="card-skeleton card-skeleton-bar-detail"
                  />
                ))}
              </Col>
            </Row>
          ) : (
            <Row>
              <Col lg={4}>
                <img
                  src={`${process.env.REACT_APP_IMG_URL}${dataDetail.poster_path}`}
                  className="img-detail"
                  alt={dataDetail.title}
                />
              </Col>
              <Col lg={8}>
                {[
                  { label: 'ID', value: dataDetail.id },
                  { label: 'Title', value: dataDetail.title },
                  {
                    label: 'Genre',
                    value: dataDetail.genres?.map((g) => g.name).join(', '),
                  },
                  {
                    label: 'Overview',
                    value: dataDetail.overview,
                    textarea: true,
                  },
                  {
                    label: 'Release Date',
                    value: formatDate(dataDetail.release_date),
                  },
                  {
                    label: 'Status',
                    value:
                      dataDetail.status === 'Released'
                        ? 'Released ✅'
                        : 'Not Released ❌',
                  },
                  {
                    label: 'Rating',
                    value: `${parseFloat(dataDetail?.vote_average).toFixed(
                      1
                    )}⭐`,
                  },
                ].map(({ label, value, textarea }, idx) => (
                  <InputGroup className="mb-3" key={idx}>
                    <InputGroup.Text className="input-group-text">
                      <b className="value-text">{label}</b>
                    </InputGroup.Text>
                    <Form.Control
                      as={textarea ? 'textarea' : 'input'}
                      rows={textarea ? 3 : undefined}
                      aria-label={label.toLowerCase()}
                      value={value}
                      readOnly
                      style={textarea ? { overflow: 'scroll' } : {}}
                      className="value-text"
                    />
                  </InputGroup>
                ))}
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
