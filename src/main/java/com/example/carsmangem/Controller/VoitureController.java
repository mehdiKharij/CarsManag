package com.example.carsmangem.Controller;

import com.example.carsmangem.Modele.Voiture;
import com.example.carsmangem.Repository.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/voitures") // Utilisation de RequestMapping pour un préfixe d'URL commun
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    // Récupérer toutes les voitures
    @GetMapping
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }

    // Récupérer une voiture par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Voiture> getVoitureById(@PathVariable Long id) {
        Optional<Voiture> voitureOpt = voitureRepo.findById(id);
        return voitureOpt.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter une nouvelle voiture
    @PostMapping("/add") // Utilisation d'une route spécifique pour l'ajout
    public ResponseEntity<Voiture> addVoiture(@RequestBody Voiture voiture) {
        Voiture savedVoiture = voitureRepo.save(voiture);
        return ResponseEntity.ok(savedVoiture);
    }

    // Mettre à jour une voiture existante
    @PutMapping("/{id}")
    public ResponseEntity<Voiture> updateVoiture(@PathVariable Long id, @RequestBody Voiture voiture) {
        if (!voitureRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        voiture.setId(id); // Assurez-vous que l'ID de la voiture est défini pour la mise à jour
        Voiture updatedVoiture = voitureRepo.save(voiture);
        return ResponseEntity.ok(updatedVoiture);
    }

    // Méthode pour supprimer une voiture
    @DeleteMapping("/{id}") // Correction ici
    public ResponseEntity<Void> deleteVoiture(@PathVariable Long id) {
        if (voitureRepo.existsById(id)) {
            voitureRepo.deleteById(id);
            return ResponseEntity.noContent().build(); // Retourne un statut 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // Retourne un statut 404 Not Found si la voiture n'existe pas
        }
    }
}
