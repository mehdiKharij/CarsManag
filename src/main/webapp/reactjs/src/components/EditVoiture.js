import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast'; // Ensure the import path is correct

const EditVoiture = () => {
    const [voiture, setVoiture] = useState({
        marque: '',
        modele: '',
        couleur: '',
        immatricule: '',
        prix: '',
        annee: ''
    });

    const [show, setShow] = useState(false); // State for Toast
    const [message, setMessage] = useState(''); // State for Toast message

    const navigate = useNavigate(); // Hook for navigation
    const { id } = useParams(); // Hook to get the ID from the URL

    // Load car data if an ID is provided (edit case)
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/voitures/${id}`)
                .then(response => {
                    if (response.data != null) {
                        setVoiture(response.data);
                    }
                })
                .catch(error => {
                    console.error('Error loading car data:', error);
                });
        }
    }, [id]);

    const voitureChange = event => {
        setVoiture({
            ...voiture,
            [event.target.name]: event.target.value
        });
    };

    const submitVoiture = event => {
        event.preventDefault();

        const voitureData = {
            marque: voiture.marque,
            modele: voiture.modele,
            couleur: voiture.couleur,
            immatricule: voiture.immatricule,
            prix: parseInt(voiture.prix),
            annee: parseInt(voiture.annee)
        };

        // Update the car details
        axios.put(`http://localhost:8080/voitures/${id}`, voitureData, {
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                if (response.data != null) {
                    setMessage('Voiture mise à jour avec succès');
                    setShow(true); // Show Toast
                    navigate('/list'); // Navigate back to list after update
                }
            })
            .catch(error => {
                console.error('Error updating the car:', error);
            });

        // Hide the Toast after 3 seconds
        setTimeout(() => {
            setShow(false);
        }, 3000);
    };

    return (
        <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>Modifier Voiture</Card.Header>
            <Form onSubmit={submitVoiture} id="VoitureFormId">
                <Card.Body>
                    <Row>
                        <Form.Group as={Col} controlId="formGridMarque">
                            <Form.Label>Marque</Form.Label>
                            <Form.Control
                                required
                                name="marque"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Entrez Marque Voiture"
                                value={voiture.marque}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridModele">
                            <Form.Label>Modèle</Form.Label>
                            <Form.Control
                                required
                                name="modele"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Entrez Modèle Voiture"
                                value={voiture.modele}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridCouleur">
                            <Form.Label>Couleur</Form.Label>
                            <Form.Control
                                required
                                name="couleur"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Entrez Couleur Voiture"
                                value={voiture.couleur}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridImmatricule">
                            <Form.Label>Immatricule</Form.Label>
                            <Form.Control
                                required
                                name="immatricule"
                                type="text"
                                className="bg-dark text-white"
                                placeholder="Entrez Immatricule Voiture"
                                value={voiture.immatricule}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPrix">
                            <Form.Label>Prix</Form.Label>
                            <Form.Control
                                required
                                name="prix"
                                type="number" // Change to number for better input validation
                                className="bg-dark text-white"
                                placeholder="Entrez Prix Voiture"
                                value={voiture.prix}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridAnnee">
                            <Form.Label>Année</Form.Label>
                            <Form.Control
                                required
                                name="annee"
                                type="number" // Change to number for better input validation
                                className="bg-dark text-white"
                                placeholder="Entrez Année Voiture"
                                value={voiture.annee}
                                onChange={voitureChange}
                            />
                        </Form.Group>
                    </Row>
                </Card.Body>
                <Card.Footer style={{ textAlign: 'right' }}>
                    <Button size="sm" variant="success" type="submit">
                        <FontAwesomeIcon icon={faEdit} className="me-2" />
                        Mettre à jour
                    </Button>
                </Card.Footer>
            </Form>

            {/* Display the Toast */}
            <div style={{ display: show ? "block" : "none" }}>
                <MyToast children={{ show, message }} />
            </div>
        </Card>
    );
};

export default EditVoiture;
