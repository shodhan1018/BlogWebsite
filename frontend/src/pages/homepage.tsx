import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

export default function NavBar(){
  // event.preventDefault();
  return(
    <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">Blog Website</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Item>
              <Link className="nav-link" to="/user">user</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/post">new Blog</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/blogs">blogs</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/myblogs">myblogs</Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/login">login</Link>
            </Nav.Item>
            
          </Nav>
        </Container>
      </Navbar>
  );
}