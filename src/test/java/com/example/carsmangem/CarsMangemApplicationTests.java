package com.example.carsmangem;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

import com.example.carsmangem.Controller.VoitureController;

@SpringBootTest
class CarsMangemApplicationTests {

    @Autowired
    VoitureController voitureController;

    @Test
        // Indique que cette méthode peut être exécutée comme un cas de test
    void contextLoads() {
        // On teste si l’instance du contrôleur a été créée et injectée avec succès
        assertThat(voitureController).isNotNull();
    }
}
