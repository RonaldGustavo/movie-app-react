import { Button, Form } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovieAction } from '../actions';
import { GET_KEYWORD, GET_PAGE, IS_SEARCH } from '../../../constant';

function HeaderMovie() {
  const dispatch = useDispatch();
  const { keyword } = useSelector((state) => state.movies);

  const handleSearch = () => {
    dispatch({
      type: IS_SEARCH,
      payload: true,
    });
    dispatch({
      type: GET_PAGE,
      payload: 1,
    });

    if (keyword === '') {
      dispatch({
        type: IS_SEARCH,
        payload: false,
      });
    } else {
      dispatch(searchMovieAction(keyword, 1));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <Navbar
      expand="lg"
      // fixed="top"
      className="py-3 navbar-container"
    >
      <Container fluid>
        <Navbar.Brand className="navbar-title">
          🎬 Movie App Ronald
        </Navbar.Brand>

        <Form className="d-flex ms-auto" onSubmit={(e) => e.preventDefault()}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 custom-search input-search"
            aria-label="Search"
            onChange={(e) =>
              dispatch({
                type: GET_KEYWORD,
                payload: e.target.value,
              })
            }
            onKeyPress={handleKeyPress}
            value={keyword}
          />
          <Button
            variant="outline-light"
            style={{ fontWeight: '600', letterSpacing: '1px' }}
            onClick={handleSearch}
          >
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default HeaderMovie;
