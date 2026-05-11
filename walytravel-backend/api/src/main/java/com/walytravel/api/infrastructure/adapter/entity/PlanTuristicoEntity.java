package com.walytravel.api.infrastructure.adapter.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "plan_turistico") // Así se llamará tu tabla en Supabase
public class PlanTuristicoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Esto hace que el ID sea autoincrementable (1, 2, 3...)
    private Long id;

    private String titulo;
    private String descripcion;
    private String imagenDestacadaUrl;
    private BigDecimal precioBase;

    // --- Constructor vacío que exige Hibernate ---
    public PlanTuristicoEntity() {}

    // --- Constructor con todos los datos ---
    public PlanTuristicoEntity(Long id, String titulo, String descripcion, String imagenDestacadaUrl, BigDecimal precioBase) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagenDestacadaUrl = imagenDestacadaUrl;
        this.precioBase = precioBase;
    }

    // --- Getters y Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public String getImagenDestacadaUrl() { return imagenDestacadaUrl; }
    public void setImagenDestacadaUrl(String imagenDestacadaUrl) { this.imagenDestacadaUrl = imagenDestacadaUrl; }
    public BigDecimal getPrecioBase() { return precioBase; }
    public void setPrecioBase(BigDecimal precioBase) { this.precioBase = precioBase; }
}