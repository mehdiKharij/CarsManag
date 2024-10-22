package com.example.carsmangem;

import com.example.carsmangem.Modele.Proprietaire;
import com.example.carsmangem.Modele.Voiture;
import com.example.carsmangem.Repository.ProprietaireRepo;
import com.example.carsmangem.Repository.VoitureRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;

@SpringBootApplication
public class CarsMangemApplication {

    // Injection des repositories
    @Autowired
    private VoitureRepo voitureRepository;

    @Autowired
    private ProprietaireRepo proprietaireRepo;

    public static void main(String[] args) {
        SpringApplication.run(CarsMangemApplication.class, args);
    }

    // Utilisation correcte du repository dans runner()
    @Bean
    CommandLineRunner runner() {
        return args -> {
            // Création des propriétaires
            Proprietaire proprietaire1 = new Proprietaire("Ali", "Hassan");
            Proprietaire proprietaire2 = new Proprietaire("Najat", "Bani");
            proprietaireRepo.save(proprietaire1);
            proprietaireRepo.save(proprietaire2);

            // Ajout des voitures avec les propriétaires
            voitureRepository.save(new Voiture("Toyota", "Corolla", "Grise", "A-1-9090", 2018, 95000, proprietaire1));
            voitureRepository.save(new Voiture("Ford", "Fiesta", "Rouge", "A-2-8090", 2015, 90000, proprietaire1));
            voitureRepository.save(new Voiture("Honda", "CRV", "Bleu", "A-3-7090", 2016, 140000, proprietaire2));
        };
    }
}
