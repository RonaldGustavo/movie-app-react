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
    dispatch({ type: GET_PAGE, payload: 1 });

    if (keyword.trim() === '') {
      dispatch({ type: IS_SEARCH, payload: false });
    } else {
      dispatch({ type: IS_SEARCH, payload: true });
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
    <Navbar expand="lg" className="navbar-container">
      <Container fluid className="px-3 px-md-4">
        <Navbar.Brand className="navbar-title">🎬 Movie App</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-search" />

        <Navbar.Collapse id="navbar-search" className="justify-content-end">
          <Form
            className="d-flex search-form"
            onSubmit={(e) => e.preventDefault()}
          >
            <Form.Control
              type="search"
              placeholder="Search movies..."
              className="input-search"
              aria-label="Search"
              onChange={(e) =>
                dispatch({ type: GET_KEYWORD, payload: e.target.value })
              }
              onKeyPress={handleKeyPress}
              value={keyword}
            />
            <Button className="btn-search" onClick={handleSearch}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderMovie;
