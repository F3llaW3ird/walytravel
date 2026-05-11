package com.walytravel.api.domain.port;

import com.walytravel.api.domain.model.PlanTuristico;
import java.util.List;
import java.util.Optional;

public interface PlanTuristicoRepository {
    
    // Regla 1: El sistema debe poder devolver una lista de todos los planes
    List<PlanTuristico> obtenerTodos();

    // Regla 2: El sistema debe poder buscar un plan específico por su ID
    // Usamos 'Optional' porque puede que el ID no exista (ej: el tour 99 no existe)
    Optional<PlanTuristico> obtenerPorId(Long id);

    // Regla 3: El sistema debe poder guardar un plan nuevo y devolverlo
    PlanTuristico guardar(PlanTuristico plan);

    void eliminar(Long id);
}