package com.walytravel.api.infrastructure.rest;

import com.walytravel.api.application.usecase.PlanTuristicoUseCase;
import com.walytravel.api.domain.model.PlanTuristico;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/planes") // Esta será la URL de tu página: localhost:8080/api/planes
@CrossOrigin(origins = "http://localhost:3000") // ¡Esta es la llave maestra!
public class PlanTuristicoController {

    private final PlanTuristicoUseCase useCase;

    // Inyectamos el cerebro (Caso de Uso) en el recepcionista
    public PlanTuristicoController(PlanTuristicoUseCase useCase) {
        this.useCase = useCase;
    }

    // Cuando alguien entre a tu web por GET, devolvemos la lista
    @GetMapping
    public ResponseEntity<List<PlanTuristico>> obtenerTodos() {
        List<PlanTuristico> planes = useCase.obtenerTodosLosPlanes();
        return ResponseEntity.ok(planes);
    }

    // Cuando tu futuro panel de administrador envíe un POST, guardamos el plan
    @PostMapping
    public ResponseEntity<PlanTuristico> crearPlan(@RequestBody PlanTuristico nuevoPlan) {
        PlanTuristico planGuardado = useCase.registrarNuevoPlan(nuevoPlan);
        return ResponseEntity.ok(planGuardado);
    }

    // --- NUEVO: Cuando el administrador presione el botón de eliminar ---
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPlan(@PathVariable Long id) {
        useCase.eliminarPlan(id);
        // Devuelve un código HTTP 204 (No Content), que en internet significa "Operación exitosa, ya no hay nada aquí"
        return ResponseEntity.noContent().build(); 
    }

    // --- NUEVO: Cuando el administrador presione guardar un plan editado ---
    @PutMapping("/{id}")
    public ResponseEntity<PlanTuristico> actualizarPlan(@PathVariable Long id, @RequestBody PlanTuristico planActualizado) {
        PlanTuristico actualizado = useCase.actualizarPlan(id, planActualizado);
        return ResponseEntity.ok(actualizado);
    }

    // --- NUEVO: Cuando el turista hace clic en "Ver Detalles" de un tour específico ---
    @GetMapping("/{id}")
    public ResponseEntity<PlanTuristico> obtenerPorId(@PathVariable Long id) {
        // Buscamos el plan. Si existe, lo devolvemos con código 200 (OK). Si no, código 404 (Not Found).
        return useCase.obtenerPlanPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}