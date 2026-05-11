package com.walytravel.api.infrastructure.adapter.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanTuristicoJpaRepository extends JpaRepository<PlanTuristicoEntity, Long> {
}