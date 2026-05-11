package com.walytravel.api.infrastructure.config;

import com.walytravel.api.application.usecase.PlanTuristicoUseCase;
import com.walytravel.api.domain.port.PlanTuristicoRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BeanConfiguration {
    @Bean
    public PlanTuristicoUseCase planTuristicoUseCase(PlanTuristicoRepository repository) {
        return new PlanTuristicoUseCase(repository);
    }
}