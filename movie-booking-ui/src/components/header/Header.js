import { Navbar, Container, Nav, NavDropdown, Form, Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {getUserName, getUserRole, setUserRole, setUserName} from "../../User";
import {setAuthHeader} from "../../api/axiosConfig";

const Header = () => {

    const isLoggedIn = getUserName() != null;

    const isAdmin = getUserRole() === "ADMIN";

    const logout = () => {
        window.localStorage.removeItem("user_name");
        window.localStorage.removeItem("user_role");
        window.localStorage.removeItem("user_email")
        setAuthHeader(null);
        window.location.reload();
    }

    return (
        <Navbar expand="lg" variant="dark" bg="dark">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":"orange"}}>
                    MovieHub
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Nav className="mr-auto">
                    <NavLink className={"nav-link"} to={"/"}>Home</NavLink>
                    {isLoggedIn ? ( // Check if the user is logged in
                        <>
                            <NavLink className={"nav-link"} to={"/edit-profile"}>
                                {getUserName()}
                            </NavLink>
                            <Button className={"nav-link"} to={"/logout"} onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <NavLink className={"nav-link"} to={"/login"}>
                            Login/Register
                        </NavLink>
                    )}
                    {isAdmin ? (
                        <NavLink className={"nav-link"} to={"/admin"}>
                            Admin
                        </NavLink>
                    ) : (
                        <div></div>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header