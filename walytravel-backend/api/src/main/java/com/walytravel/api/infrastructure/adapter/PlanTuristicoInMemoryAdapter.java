package com.walytravel.api.infrastructure.adapter;

import com.walytravel.api.domain.model.PlanTuristico;
import com.walytravel.api.domain.port.PlanTuristicoRepository;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.atomic.AtomicLong;

//@Repository
public class PlanTuristicoInMemoryAdapter implements PlanTuristicoRepository {

    private final List<PlanTuristico> baseDeDatosFalsa = new ArrayList<>();
    private final AtomicLong generadorId = new AtomicLong(1);

    public PlanTuristicoInMemoryAdapter() {
        guardar(new PlanTuristico(null, "Aguas Turquesas de Millpu", "Hermosas piscinas naturales", "url-foto-1", new BigDecimal("80.00")));
        guardar(new PlanTuristico(null, "Complejo Arqueológico Wari", "Ruinas de la cultura preinca", "url-foto-2", new BigDecimal("45.00")));
    }

    @Override
    public List<PlanTuristico> obtenerTodos() {
        return new ArrayList<>(baseDeDatosFalsa);
    }

    @Override
    public Optional<PlanTuristico> obtenerPorId(Long id) {
        return baseDeDatosFalsa.stream().filter(p -> p.getId().equals(id)).findFirst();
    }

    @Override
    public PlanTuristico guardar(PlanTuristico plan) {
        if (plan.getId() == null) {
            plan.setId(generadorId.getAndIncrement());
            baseDeDatosFalsa.add(plan);
        }
        return plan;
    }
    @Override
    public void eliminar(Long id) {
        // Lo dejamos vacío porque este adaptador ya no se usa, 
        // pero Java necesita que exista para compilar feliz.
    }
}
// ... resto del código 