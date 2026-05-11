"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

// Definimos la estructura del plan para que TypeScript nos ayude
interface PlanTuristico {
  id: number;
  titulo: string;
  descripcion: string;
  imagenDestacadaUrl: string;
  precioBase: number;
}

export default function LandingPage() {
  const [planes, setPlanes] = useState<PlanTuristico[]>([]);
  const [cargando, setCargando] = useState(true);

  // Función para traer los planes públicos desde Java
  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const respuesta = await fetch("http://localhost:8080/api/planes");
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setPlanes(datos);
        }
      } catch (error) {
        console.error("Error cargando el catálogo:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarPlanes();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      
      {/* --- 1. HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Descubre el Corazón <br/> de los Andes
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light drop-shadow-md">
            Rutas turísticas, vuelos y la magia artesanal de Ayacucho en un solo lugar.
          </p>

          <div className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
            <input type="text" placeholder="¿A dónde quieres ir?" className="flex-1 bg-white/80 p-4 rounded-xl outline-none focus:bg-white transition-colors" />
            <select className="bg-white/80 p-4 rounded-xl outline-none focus:bg-white cursor-pointer">
              <option>Destinos</option>
              <option>Rutas</option>
              <option>Vuelos</option>
              <option>Artesanías</option>
            </select>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-transform hover:scale-105">
              Explorar
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. DESTINOS TOP --- */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-black text-gray-900 mb-2">Joyas de Ayacucho</h2>
            <p className="text-gray-500 text-lg">Lugares que parecen sacados de otro mundo.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px]">
          <div className="md:col-span-2 relative rounded-3xl overflow-hidden group shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Aguas Turquesas" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">Popular</span>
              <h3 className="text-3xl font-bold text-white mb-2">Aguas Turquesas de Millpu</h3>
              <p className="text-gray-200">Piscinas naturales escondidas entre cañones.</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex-1 relative rounded-3xl overflow-hidden group shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1526392060635-9d60198810b7?q=80&w=1974&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Complejo Wari" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Complejo Wari</h3>
                <p className="text-sm text-gray-300">Historia ancestral</p>
              </div>
            </div>
            <div className="flex-1 relative rounded-3xl overflow-hidden group shadow-lg bg-gray-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1974&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" alt="Artesanía" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Ruta del Retablo</h3>
                <p className="text-sm text-gray-300">Arte vivo ayacuchano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. CATÁLOGO DINÁMICO (Conectado a Java) --- */}
      <section className="bg-gray-50 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-900 mb-4">Aventuras Disponibles</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Reserva tu próximo viaje con nosotros. Precios transparentes y experiencias inolvidables.
            </p>
          </div>

          {cargando ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-500">Cargando catálogo...</p>
            </div>
          ) : planes.length === 0 ? (
            <div className="text-center py-12 text-gray-500 italic">
              Pronto agregaremos nuevas aventuras.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {planes.map((plan) => (
                <div key={plan.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col group border border-gray-100">
                  <div className="relative overflow-hidden h-56">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={plan.imagenDestacadaUrl} 
                      alt={plan.titulo} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-blue-700 shadow-sm">
                      S/. {plan.precioBase}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-2xl text-gray-900 mb-2">{plan.titulo}</h3>
                    <p className="text-gray-600 text-sm mb-6 flex-1 line-clamp-3">
                      {plan.descripcion}
                    </p>
                    
                    {/* --- AQUÍ ESTÁ EL ENLACE QUE REEMPLAZÓ AL BOTÓN --- */}
                    <Link 
                      href={`/tour/${plan.id}`} 
                      className="w-full text-center block bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-100 font-bold py-3 rounded-xl transition-colors"
                    >
                      Ver Detalles
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </main>
  );
}