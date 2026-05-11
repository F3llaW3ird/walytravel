package com.walytravel.api.application.usecase;

import com.walytravel.api.domain.model.PlanTuristico;
import com.walytravel.api.domain.port.PlanTuristicoRepository;
import java.util.List;
import java.util.Optional;

public class PlanTuristicoUseCase {
    
    // El caso de uso conoce el "contrato" (puerto), pero no sabe si es Oracle, Supabase o memoria RAM
    private final PlanTuristicoRepository repository;

    // Constructor que inyecta la dependencia (el contrato)
    public PlanTuristicoUseCase(PlanTuristicoRepository repository) {
        this.repository = repository;
    }

    // Caso de uso 1: Un turista entra a la página y quiere ver todos los tours
    public List<PlanTuristico> obtenerTodosLosPlanes() {
        return repository.obtenerTodos();
    }

    // Caso de uso 2: Un turista hace clic en "Aguas Turquesas" para ver el detalle
    public Optional<PlanTuristico> obtenerPlanPorId(Long id) {
        return repository.obtenerPorId(id);
    }

    // Caso de uso 3: El administrador (tú) crea un nuevo tour
    public PlanTuristico registrarNuevoPlan(PlanTuristico plan) {
        // Aquí podrías agregar validaciones lógicas antes de guardar
        // Por ejemplo: if (plan.getPrecioBase().signum() < 0) throw new Error("El precio no puede ser negativo");
        
        return repository.guardar(plan);
    }

    // Caso de uso 4: El administrador (tú) elimina un tour que ya no está disponible
    public void eliminarPlan(Long id) {
        repository.eliminar(id);
    }

    // Caso de uso 5: El administrador actualiza un plan existente
    public PlanTuristico actualizarPlan(Long id, PlanTuristico planActualizado) {
        planActualizado.setId(id); // Le inyectamos el ID para asegurar que reemplace al correcto
        return repository.guardar(planActualizado); // Reutilizamos tu método guardar, ¡Spring Boot hace la magia!
    }
}