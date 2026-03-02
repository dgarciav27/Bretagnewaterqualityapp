import { useNavigate } from "react-router";
import { Droplet, Waves, MapPin } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#1a3a5c] flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplet className="w-16 h-16 text-cyan-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Bretagne Water Quality
          </h1>
          <p className="text-cyan-200 text-lg">
            ¿Qué estás buscando hoy?
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Tap Water Card */}
          <button
            onClick={() => navigate("/tap-water")}
            className="group bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] border-2 border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                <Droplet className="w-8 h-8 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agua del Grifo</h2>
            </div>
            
            <div className="text-left space-y-3">
              <p className="text-cyan-100/90 text-sm">
                Para residentes, familias y estudiantes
              </p>
              <div className="space-y-2 text-sm text-cyan-200/70">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>¿Es segura mi agua del grifo?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Impacto en piel y cabello</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Nitratos, pesticidas y metales</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Recomendaciones de filtrado</span>
                </p>
              </div>
            </div>
          </button>

          {/* Beach Water Card */}
          <button
            onClick={() => navigate("/beach-water")}
            className="group bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] border-2 border-cyan-500/30 rounded-2xl p-8 hover:border-cyan-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-cyan-500/20 rounded-xl group-hover:bg-cyan-500/30 transition-colors">
                <Waves className="w-8 h-8 text-cyan-300" />
              </div>
              <h2 className="text-2xl font-bold text-white">Agua de Playa</h2>
            </div>
            
            <div className="text-left space-y-3">
              <p className="text-cyan-100/90 text-sm">
                Para bañistas, turistas y surfistas
              </p>
              <div className="space-y-2 text-sm text-cyan-200/70">
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>¿Es seguro nadar hoy?</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Estado en tiempo real</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Niveles de E. coli y enterococos</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span>
                  <span>Predicciones a corto plazo</span>
                </p>
              </div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/map")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 rounded-lg text-cyan-300 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <span>Ver Mapa de Calidad del Agua</span>
          </button>
        </div>
      </div>
    </div>
  );
}
