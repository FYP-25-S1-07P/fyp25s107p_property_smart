import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaChartLine, FaSearchLocation, FaHome } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <Container className="py-5">
                    <Row className="align-items-center text-center text-md-start">
                        <Col xs={12} md={6} className="mb-4">
                            <h1 className="hero-title">Predict Singapore HDB Housing Prices with Precision</h1>
                            <p className="hero-subtext">
                                Make informed decisions with our advanced AI-powered prediction model and comprehensive
                                data visualization tools for Singapore's housing market.
                            </p>
                            <Button className="cta-button">Try It Free</Button>
                        </Col>
                        <Col xs={12} md={6}>
                            <img src="/hdb-building.png" alt="HDB Flat" className="img-fluid hero-image"/>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <div className="features-section py-5">
                <Container>
                    <Row className="g-4"> {/* Added spacing between cards */}
                        <Col xs={12} md={4}>
                            <div className="features-card">
                                <FaChartLine className="features-card-icon"/>
                                <h5 className="features-card-title">Price Predictions</h5>
                                <p className="features-card-description">
                                    Get accurate HDB price predictions powered by advanced machine learning algorithms.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="features-card">
                                <FaHome className="features-card-icon"/>
                                <h5 className="features-card-title">Price Trends</h5>
                                <p className="features-card-description">
                                    Analyze historical price trends and market patterns through interactive
                                    visualizations.
                                </p>
                            </div>
                        </Col>
                        <Col xs={12} md={4}>
                            <div className="features-card">
                                <FaSearchLocation className="features-card-icon"/>
                                <h5 className="features-card-title">Geospatial Analysis</h5>
                                <p className="features-card-description">
                                    Explore property prices across different locations with our interactive map
                                    interface.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Statistics Section */}
            <div className="stats-section">
                <Container className="py-5 text-center">
                    <Row>
                        <Col md={3}>
                            <h2 className="stat-number">98%</h2>
                            <p className="stat-text">Prediction Accuracy</p>
                        </Col>
                        <Col md={3}>
                            <h2 className="stat-number">50K+</h2>
                            <p className="stat-text">Properties Analyzed</p>
                        </Col>
                        <Col md={3}>
                            <h2 className="stat-number">24/7</h2>
                            <p className="stat-text">Real-time Updates</p>
                        </Col>
                        <Col md={3}>
                            <h2 className="stat-number">100+</h2>
                            <p className="stat-text">Data Points</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Home;