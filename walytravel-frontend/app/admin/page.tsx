"use client";
import { useState, useEffect } from "react";

interface PlanTuristico {
  id: number;
  titulo: string;
  descripcion: string;
  imagenDestacadaUrl: string;
  precioBase: number;
}

export default function Home() {
  // Estado para saber si estamos creando uno nuevo (null) o editando uno existente (tendrá el ID)
  const [idEditando, setIdEditando] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagenDestacadaUrl: "",
    precioBase: "",
  });

  const [planes, setPlanes] = useState<PlanTuristico[]>([]);

  const cargarPlanes = async () => {
    try {
      const respuesta = await fetch("http://localhost:8080/api/planes");
      if (respuesta.ok) {
        const datos = await respuesta.json();
        setPlanes(datos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    cargarPlanes();
  }, []);

  // --- NUEVA FUNCIÓN: Prepara el formulario para editar ---
  const cargarParaEditar = (plan: PlanTuristico) => {
    setIdEditando(plan.id);
    setFormData({
      titulo: plan.titulo,
      descripcion: plan.descripcion,
      imagenDestacadaUrl: plan.imagenDestacadaUrl,
      precioBase: plan.precioBase.toString(),
    });
    // Hacemos que la pantalla suba suavemente hasta el formulario
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- FUNCIÓN MEJORADA: Ahora sabe si debe GUARDAR o ACTUALIZAR ---
  const guardarPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Si tenemos un idEditando, la URL lleva el ID y usamos PUT. Si no, usamos POST.
      const url = idEditando 
        ? `http://localhost:8080/api/planes/${idEditando}` 
        : "http://localhost:8080/api/planes";
      
      const metodo = idEditando ? "PUT" : "POST";

      const respuesta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          precioBase: parseFloat(formData.precioBase),
        }),
      });

      if (respuesta.ok) {
        alert(idEditando ? "¡Plan actualizado con éxito!" : "¡Plan guardado con éxito!");
        cancelarEdicion(); // Limpiamos todo
        cargarPlanes(); 
      } else {
        alert("Uy, algo falló al guardar.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión. ¿Está encendido Java?");
    }
  };

  const eliminarPlan = async (id: number) => {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este paquete turístico?");
    if (!confirmar) return; 

    try {
      const respuesta = await fetch(`http://localhost:8080/api/planes/${id}`, {
        method: "DELETE",
      });

      if (respuesta.ok) {
        alert("¡Plan eliminado correctamente!");
        cargarPlanes(); 
        if (idEditando === id) cancelarEdicion(); // Si borras el que estabas editando, limpiamos el form
      } else {
        alert("Error al intentar eliminar el plan.");
      }
    } catch {
      alert("Error de conexión con el servidor Java.");
    }
  };

  // Función para limpiar el formulario y salir del "Modo Edición"
  const cancelarEdicion = () => {
    setIdEditando(null);
    setFormData({ titulo: "", descripcion: "", imagenDestacadaUrl: "", precioBase: "" });
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8 text-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">WalyTravel Dashboard</h1>
        <p className="text-gray-600 mb-8">Gestor de Paquetes Turísticos de Ayacucho</p>

        {/* --- FORMULARIO DINÁMICO --- */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            {idEditando ? "✏️ Editando Plan Turístico" : "➕ Agregar Nuevo Plan"}
          </h2>
          
          <form onSubmit={guardarPlan} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Título del Tour</label>
              <input type="text" required value={formData.titulo} onChange={(e) => setFormData({...formData, titulo: e.target.value})} placeholder="Ej. Millpu..." className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
              <textarea required value={formData.descripcion} onChange={(e) => setFormData({...formData, descripcion: e.target.value})} placeholder="Detalles..." rows={3} className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1">URL de la Imagen</label>
                <input type="url" required value={formData.imagenDestacadaUrl} onChange={(e) => setFormData({...formData, imagenDestacadaUrl: e.target.value})} placeholder="https://..." className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Precio (S/.)</label>
                <input type="number" step="0.01" required value={formData.precioBase} onChange={(e) => setFormData({...formData, precioBase: e.target.value})} placeholder="0.00" className="w-full border p-2 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              <button type="submit" className={`flex-1 text-white font-bold py-3 rounded-lg transition-colors ${idEditando ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                {idEditando ? "Actualizar Cambios" : "Guardar en Base de Datos"}
              </button>
              
              {idEditando && (
                <button type="button" onClick={cancelarEdicion} className="w-1/3 bg-gray-300 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-400 transition-colors">
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* --- LISTA DE PLANES --- */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Planes Actuales</h2>
          
          {planes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 italic border-2 border-dashed rounded-lg">
              No hay planes turísticos registrados aún.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {planes.map((plan) => (
                <div key={plan.id} className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col bg-gray-50 relative group">
                  
                  {/* --- CONTROLES FLOTANTES --- */}
                  <div className="absolute top-2 right-2 flex gap-2 z-10">
                    {/* Botón Editar */}
                    <button 
                      onClick={() => cargarParaEditar(plan)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md transition-colors"
                      title="Editar tour"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    {/* Botón Eliminar */}
                    <button 
                      onClick={() => eliminarPlan(plan.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md transition-colors"
                      title="Eliminar tour"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={plan.imagenDestacadaUrl} alt={plan.titulo} className="h-48 w-full object-cover" />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-xl text-blue-800">{plan.titulo}</h3>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-3">{plan.descripcion}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <span className="text-sm font-semibold text-gray-500">Precio base:</span>
                      <span className="font-bold text-green-600 text-xl">S/. {plan.precioBase}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}