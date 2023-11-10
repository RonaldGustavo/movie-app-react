import { Button, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function HeaderMovie() {
  return (
    <Navbar className="bg-dark w-100 py-3" expand="lg">
      <Container fluid>
        <Navbar.Brand
          href="#home"
          style={{ color: "#fff", textShadow: "1.5px 1px 4px" }}
        >
          Movie App Ronald
        </Navbar.Brand>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-light">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default HeaderMovie;
