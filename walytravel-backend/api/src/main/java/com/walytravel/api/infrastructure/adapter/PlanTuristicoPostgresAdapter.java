package com.walytravel.api.infrastructure.adapter;

import com.walytravel.api.domain.model.PlanTuristico;
import com.walytravel.api.domain.port.PlanTuristicoRepository;
import com.walytravel.api.infrastructure.adapter.entity.PlanTuristicoEntity;
import com.walytravel.api.infrastructure.adapter.entity.PlanTuristicoJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class PlanTuristicoPostgresAdapter implements PlanTuristicoRepository {

    private final PlanTuristicoJpaRepository jpaRepository;

    // Inyectamos el conector de Supabase
    public PlanTuristicoPostgresAdapter(PlanTuristicoJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    @Override
    public List<PlanTuristico> obtenerTodos() {
        // Busca en Supabase y traduce cada resultado al modelo de tu Dominio
        return jpaRepository.findAll().stream()
                .map(this::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PlanTuristico> obtenerPorId(Long id) {
        return jpaRepository.findById(id).map(this::toDomain);
    }

    @Override
    public PlanTuristico guardar(PlanTuristico plan) {
        // 1. Traduce de Dominio a Entidad de BD
        PlanTuristicoEntity entity = toEntity(plan);
        // 2. Guarda en Supabase
        PlanTuristicoEntity entityGuardado = jpaRepository.save(entity);
        // 3. Traduce de vuelta a Dominio
        return toDomain(entityGuardado);
    }
    @Override
    public void eliminar(Long id) {
        jpaRepository.deleteById(id);
    }

    // ==========================================
    // TRADUCTORES (MAPPERS)
    // ==========================================
    
    private PlanTuristico toDomain(PlanTuristicoEntity entity) {
        return new PlanTuristico(
                entity.getId(),
                entity.getTitulo(),
                entity.getDescripcion(),
                entity.getImagenDestacadaUrl(),
                entity.getPrecioBase()
        );
    }

    private PlanTuristicoEntity toEntity(PlanTuristico plan) {
        return new PlanTuristicoEntity(
                plan.getId(),
                plan.getTitulo(),
                plan.getDescripcion(),
                plan.getImagenDestacadaUrl(),
                plan.getPrecioBase()
        );
    }
}