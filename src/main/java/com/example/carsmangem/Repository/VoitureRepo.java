package com.example.carsmangem.Repository;

import com.example.carsmangem.Modele.Voiture;
import org.springframework.data.repository.CrudRepository;

import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

@RepositoryRestResource(path = "voitures")
public interface VoitureRepo extends CrudRepository<Voiture, Long> {

    //Lister Voitures par marque
    List<Voiture> findByModele(@Param("modele") String modele);

    List<Voiture> findByCouleur(@Param("couleur") String couleur);
}
