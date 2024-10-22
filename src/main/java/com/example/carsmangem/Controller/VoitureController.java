package com.example.carsmangem.Controller;

import com.example.carsmangem.Modele.Voiture;
import com.example.carsmangem.Repository.VoitureRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoitureController {

    @Autowired
    private VoitureRepo voitureRepo;

    @GetMapping("/voitures")  // Use GetMapping for GET requests
    public Iterable<Voiture> getVoitures() {
        return voitureRepo.findAll();
    }
}

