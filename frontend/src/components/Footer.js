import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>Property Smart</h5>
                        <p>Your trusted partner for Singapore HDB price predictions.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Features</h5>
                        <ul className="list-unstyled">
                            <li>Price Prediction</li>
                            <li>Market Analysis</li>
                            <li>Location Insights</li>
                        </ul>
                    </Col>
                    <Col md={4} className="text-center">
                        <h5>Follow Us</h5>
                        <FaFacebook size={24} className="mx-2" />
                        <FaTwitter size={24} className="mx-2" />
                        <FaLinkedin size={24} className="mx-2" />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;