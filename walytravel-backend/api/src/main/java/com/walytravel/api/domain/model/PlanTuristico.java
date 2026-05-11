package com.walytravel.api.domain.model;

import java.math.BigDecimal;

public class PlanTuristico {
    
    private Long id;
    private String titulo;
    private String descripcion;
    private String imagenDestacadaUrl;
    private BigDecimal precioBase;

    // Constructor vacío
    public PlanTuristico() {
    }

    // Constructor con parámetros
    public PlanTuristico(Long id, String titulo, String descripcion, String imagenDestacadaUrl, BigDecimal precioBase) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.imagenDestacadaUrl = imagenDestacadaUrl;
        this.precioBase = precioBase;
    }

    // Getters
    public Long getId() { return id; }
    public String getTitulo() { return titulo; }
    public String getDescripcion() { return descripcion; }
    public String getImagenDestacadaUrl() { return imagenDestacadaUrl; }
    public BigDecimal getPrecioBase() { return precioBase; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    public void setImagenDestacadaUrl(String imagenDestacadaUrl) { this.imagenDestacadaUrl = imagenDestacadaUrl; }
    public void setPrecioBase(BigDecimal precioBase) { this.precioBase = precioBase; }
}