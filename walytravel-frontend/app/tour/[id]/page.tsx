"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface PlanTuristico {
  id: number;
  titulo: string;
  descripcion: string;
  imagenDestacadaUrl: string;
  precioBase: number;
}

export default function DetalleTour() {
  const params = useParams();
  const router = useRouter();
  const [plan, setPlan] = useState<PlanTuristico | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const respuesta = await fetch(`http://localhost:8080/api/planes/${params.id}`);
        if (respuesta.ok) {
          const datos = await respuesta.json();
          setPlan(datos);
        } else {
          // Si el ID no existe en Java, regresamos a la portada
          router.push("/");
        }
      } catch (error) {
        console.error("Error al cargar detalle:", error);
      } finally {
        setCargando(false);
      }
    };

    if (params.id) cargarDetalle();
  }, [params.id, router]);

  if (cargando) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-blue-600">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-current border-t-transparent"></div>
    </div>
  );

  if (!plan) return null;

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Botón Volver */}
      <div className="fixed top-8 left-8 z-50">
        <Link href="/" className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center group">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-800 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row h-screen">
        {/* Lado Izquierdo: Imagen Hero */}
        <section className="lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={plan.imagenDestacadaUrl} 
            alt={plan.titulo} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent lg:hidden"></div>
        </section>

        {/* Lado Derecho: Información */}
        <section className="lg:w-1/2 h-full overflow-y-auto p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="max-w-xl">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">Destino Destacado</span>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
              {plan.titulo}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="text-3xl font-bold text-green-600">S/. {plan.precioBase}</div>
              <div className="text-gray-400">|</div>
              <div className="text-gray-500 italic">Disponibilidad Inmediata</div>
            </div>

            <div className="prose prose-lg text-gray-600 mb-10">
              <p className="leading-relaxed">
                {plan.descripcion}
              </p>
            </div>

            {/* Acciones de Reserva */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href={`https://wa.me/519XXXXXXXXX?text=Hola! Me interesa el tour: ${plan.titulo}`}
                target="_blank"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:-translate-y-1"
              >
                Reservar por WhatsApp
              </a>
              <button className="flex-1 border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 font-bold py-4 rounded-2xl transition-all">
                Ver Itinerario Completo
              </button>
            </div>

            {/* Detalles Rápidos */}
            <div className="grid grid-cols-3 gap-4 mt-16 pt-8 border-t border-gray-100">
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-tighter">Duración</div>
                <div className="font-bold text-gray-800 italic">Día completo</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-tighter">Dificultad</div>
                <div className="font-bold text-gray-800 italic">Media</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 uppercase font-bold mb-1 tracking-tighter">Ubicación</div>
                <div className="font-bold text-gray-800 italic">Ayacucho</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}