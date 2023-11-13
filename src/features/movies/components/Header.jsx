import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch } from "react-redux";
import { searchMovieAction } from "../actions";

function HeaderMovie() {
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchMovieAction(keyword));
    setKeyword("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
      setKeyword("");
    }
  };

  return (
    <Navbar className="bg-dark w-100 py-3" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand
          href="#home"
          style={{
            color: "#fff",
            textShadow: "1.5px 1px 4px",
            fontSize: "1.5rem",
          }}
        >
          Movie App Ronald
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            value={keyword}
          />
          <Button variant="outline-light" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default HeaderMovie;
