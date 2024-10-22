package com.example.carsmangem;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.carsmangem.Modele.Voiture;
import com.example.carsmangem.Repository.VoitureRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

@DataJpaTest
// Si le test concerne uniquement les composantes JPA
// Lorsque cette annotation est utilisée, H2, Hibernate et Spring Data sont configurés
// automatiquement pour le test.
public class VoitureRepoTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private VoitureRepo voitureRepo;

    @Test
    public void ajouterVoiture() {
        Voiture voiture = new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000);
        // permet de faire persister ce tuple de l’entité Voiture
        entityManager.persistAndFlush(voiture);

        // permet de tester qu'un tuple de Voiture a bien été ajouté en mémoire H2
        assertThat(voiture.getId()).isNotNull();
    }

    @Test
    public void supprimerVoiture() {
        entityManager.persistAndFlush(new Voiture("MiolaCar", "Uber", "Blanche", "M-2020", 2021, 180000));
        entityManager.persistAndFlush(new Voiture("MiniCooper", "Uber", "Rouge", "C-2020", 2021, 180000));

        voitureRepo.deleteAll();

        // permet de tester si tous les tuples ont été supprimés
        assertThat(voitureRepo.findAll()).isEmpty();
    }
}
