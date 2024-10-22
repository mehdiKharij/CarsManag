package com.example.carsmangem.Repository;

import com.example.carsmangem.Modele.Voiture;
import org.springframework.data.repository.CrudRepository;
import org.yaml.snakeyaml.events.Event;
import org.yaml.snakeyaml.tokens.Token;

public interface VoitureRepository extends CrudRepository<Voiture, Token.ID> {
}
