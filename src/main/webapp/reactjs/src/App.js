import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import './App.css';
import NavigationBar from './components/NavigationBar';
import Bienvenue from './components/Bienvenue';
import Footer from './components/Footer';
import Voiture from './components/Voiture';
import VoitureListe from './components/VoitureList';
import EditVoiture from './components/EditVoiture';

class App extends React.Component {
    // State pour stocker la liste des voitures
    constructor(props) {
        super(props);
        this.state = {
            voitures: []  // Initialiser une liste vide pour stocker les voitures
        };

        this.submitVoiture = this.submitVoiture.bind(this);
    }

    submitVoiture(newVoiture) {
        // Ajouter la nouvelle voiture à l'état
        this.setState((prevState) => ({
            voitures: [...prevState.voitures, newVoiture]
        }));
        alert(`Voiture ajoutée: ${newVoiture.marque}`);
    }

    render() {
        const marginTop = { marginTop: "20px" };

        return (
            <Router>
                <NavigationBar />
                <Container>
                    <Row>
                        <Col lg={12} style={marginTop}>
                            <Routes>
                                <Route path="/" element={<Bienvenue />} />
                                <Route path="/add" element={
                                    <Voiture
                                        submitVoiture={this.submitVoiture}
                                    />
                                } />
                                <Route path="/list" element={<VoitureListe voitures={this.state.voitures} />} />
                                <Route path="/edit/:id" element={<EditVoiture />} /> {/* Ajoutez cette ligne */}

                            </Routes>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </Router>
        );
    }
}

export default App;
