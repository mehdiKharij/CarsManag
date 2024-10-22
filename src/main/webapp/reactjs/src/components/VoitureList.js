import React, { Component } from 'react';
import { Card, Table, Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importer Link
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Importer FontAwesomeIcon
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes

export default class VoitureList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            voitures: [] // État pour stocker les voitures
        };
    }

    componentDidMount() {
        axios.get("http://localhost:8080/voitures")
            .then(response => response.data)
            .then((data) => {
                this.setState({ voitures: data });
            })
            .catch(error => {
                console.error('Erreur lors du chargement des voitures:', error);
            });
    }

    deleteVoiture = (voitureId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
            axios.delete(`http://localhost:8080/voitures/${voitureId}`)
                .then(response => {
                    this.setState(prevState => ({
                        voitures: prevState.voitures.filter(voiture => voiture.id !== voitureId)
                    }));
                    alert('Voiture supprimée avec succès');
                })
                .catch(error => {
                    console.error('Erreur lors de la suppression de la voiture:', error);
                    alert('Erreur lors de la suppression de la voiture');
                });
        }
    };

    render() {
        const { voitures } = this.state; // Récupérer les voitures de l'état

        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header>
                    Liste des Voitures
                </Card.Header>
                <Card.Body>
                    <Table bordered striped variant="dark">
                        <thead>
                        <tr>
                            <th>Marque</th>
                            <th>Modèle</th>
                            <th>Couleur</th>
                            <th>Année</th>
                            <th>Prix</th>
                            <th>Actions</th> {/* Ajouter une colonne pour les actions */}
                        </tr>
                        </thead>
                        <tbody>
                        {voitures.length > 0 ? (
                            voitures.map((voiture) => (
                                <tr key={voiture.id} align="center">
                                    <td>{voiture.marque}</td>
                                    <td>{voiture.modele}</td>
                                    <td>{voiture.couleur}</td>
                                    <td>{voiture.annee}</td>
                                    <td>{voiture.prix}</td>
                                    <td>
                                        <ButtonGroup>
                                            <Link to={`edit/${voiture.id}`} className="btn btn-sm btn-outline-primary">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Link>{' '}
                                            <Button size="sm" variant="outline-danger" onClick={this.deleteVoiture.bind(this, voiture.id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr align="center">
                                <td colSpan="6">Aucune Voiture n'est disponible</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                    <div align="center" className="mt-2">
                        {voitures.length > 0 && <p>Nombre de voitures: {voitures.length}</p>}
                    </div>
                </Card.Body>
            </Card>
        );
    }
}
