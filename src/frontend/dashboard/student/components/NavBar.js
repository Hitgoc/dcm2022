import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AuthContext from "../../../shared/context/AuthContext";

const NavBar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("studentData");
    window.location.reload();
  };

  const context = useContext(AuthContext);

  const firstName = context.studentFirstName;

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>{firstName && `Hi, ${firstName}`}</Navbar.Brand>
          <Nav>
            <Nav.Item>
              <Nav.Link href="/student-dashboard">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/invitation">Invitation</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={logoutHandler} href="#">
                Logout
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
