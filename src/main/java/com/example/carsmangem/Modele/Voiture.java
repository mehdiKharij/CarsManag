package com.example.carsmangem.Modele;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Entity
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Voiture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NonNull
    private String marque;

    @NonNull
    private String modele;

    @NonNull
    private String couleur;

    @NonNull
    private String matricule;

    private int annee;

    private int prix;

    // Relation ManyToOne avec Proprietaire
    @ManyToOne
    @JoinColumn(name = "proprietaire_id")
    @JsonIgnore
    private Proprietaire proprietaire;

    // Constructeur personnalisé pour inclure le propriétaire
    public Voiture(String marque, String modele, String couleur, String matricule, int annee, int prix, Proprietaire proprietaire) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.matricule = matricule;
        this.annee = annee;
        this.prix = prix;
        this.proprietaire = proprietaire;
    }

    public Voiture(String marque, String modele, String couleur, String matricule, int annee, int prix) {
        this.marque = marque;
        this.modele = modele;
        this.couleur = couleur;
        this.matricule = matricule;
        this.annee = annee;
        this.prix = prix;
    }

}
