import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../core/api/auth-api";

export default function Header() {
  const navigate = useNavigate();
  let auth = JSON.parse(localStorage.getItem("user"));

  const handleLogout = (e) => {
    e.preventDefault();
    logout().then(() => {
      localStorage.removeItem("user");
      navigate("/");
    });
  };

  return (
    <Navbar bg="light" sticky="top" className="Header">
      <Container>
        <Navbar.Brand>
          <Link to="/">Messenger92</Link>
        </Navbar.Brand>
        <Nav>
          {auth === undefined ? (
            <Spinner animation="border" />
          ) : (
            <>
              {auth !== null && (
                <div className="justify-content-end">
                  <NavDropdown
                    title={
                      <Image
                        crossOrigin="anonymous"
                        src={`http://localhost:5000/api/users/profile-picture/${auth.profile._id}`}
                        roundedCircle
                        width="25px"
                      />
                    }
                    align="end"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to={"/user/" + auth.profile._id}
                    >
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/password">
                      Change Password
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
              )}
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
