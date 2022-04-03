import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import AuthContext from "../../../shared/context/AuthContext";

const NavBar = () => {
  const logoutHandler = () => {
    localStorage.removeItem("teacherData");
    window.location.reload();
  };

  const context = useContext(AuthContext);

  const firstName = context.teacherFirstName;

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand>{firstName && `Hi, ${firstName}`}</Navbar.Brand>

          <Nav>
            <Nav.Link href="/teacher-dashboard">Home</Nav.Link>

            <NavDropdown title="Class" menuVariant="light">
              <NavDropdown.Item href="/create-a-class">Create</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Invite" menuVariant="light">
              <NavDropdown.Item href="/invite-student">
                Student
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link onClick={logoutHandler} to="#">
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
