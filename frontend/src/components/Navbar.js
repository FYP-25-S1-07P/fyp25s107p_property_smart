import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

const NavigationBar = () => {
    return (
        <Navbar expand="lg" className="navbar-light bg-white shadow-sm py-3">
            <Container>
                {/* Logo on the Left */}
                <Navbar.Brand href="/" className="me-4">
                    <img src="/logo2.png" alt="Property Smart" height="60" />
                </Navbar.Brand>

                {/* Nav Items (Features, About Us, Pricing) Close to Logo */}
                <Nav className="me-auto">
                    <NavDropdown title="Features" id="features-dropdown">
                        <NavDropdown.Item href="/price-prediction">Price Prediction</NavDropdown.Item>
                        <NavDropdown.Item href="/market-analysis">Market Analysis</NavDropdown.Item>
                        <NavDropdown.Item href="/location-insights">Location Insights</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/about" className="text-dark">About Us</Nav.Link>
                    <Nav.Link href="/pricing" className="text-dark">Pricing</Nav.Link>
                </Nav>

                {/* Login (Plain Text) and Start Free Button */}
                <Nav className="ms-auto">
                    <Nav.Link href="/login" className="text-dark me-3">Login</Nav.Link>
                    <Nav.Link
                        href="/signup"
                        className="btn text-white px-3"
                        style={{
                            backgroundColor: "#ab1d79",
                            borderRadius: "10px",
                        }}
                    >
                        Start Free
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;