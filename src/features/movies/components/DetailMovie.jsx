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
    const timeoutId = setTimeout(() => setShowSkeleton(false), 1000);
    return () => clearTimeout(timeoutId);
  }, [dataDetail]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      backdrop="static"
      centered
      scrollable
    >
      <Modal.Header closeButton>
        <Modal.Title className="title-detail">Detail Movie</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-3 p-md-4">
        {isLoadingDetail || showSkeleton ? (
          <Row>
            <Col lg={4} className="mb-3 mb-lg-0">
              <div className="card-skeleton-detail" />
            </Col>
            <Col lg={8}>
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="card-skeleton-bar-detail" />
              ))}
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={4} className="mb-3 mb-lg-0">
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
                  label: 'Release',
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
                  value: `${parseFloat(dataDetail?.vote_average).toFixed(1)} ⭐`,
                },
              ].map(({ label, value, textarea }, idx) => (
                <InputGroup className="mb-2" key={idx}>
                  <InputGroup.Text>
                    <b className="value-text">{label}</b>
                  </InputGroup.Text>
                  <Form.Control
                    as={textarea ? 'textarea' : 'input'}
                    rows={textarea ? 3 : undefined}
                    aria-label={label.toLowerCase()}
                    value={value}
                    readOnly
                    style={textarea ? { resize: 'none' } : {}}
                    className="value-text"
                  />
                </InputGroup>
              ))}
            </Col>
          </Row>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button className="btn-modal-close" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailMovie;
