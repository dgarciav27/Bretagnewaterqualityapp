import { useState } from "react";
import { Search, Droplet, AlertCircle, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

type LoadingState = "idle" | "loading" | "results";

interface Parameter {
  name: string;
  value: number;
  unit: string;
  limit: number;
  status: "safe" | "warning" | "danger";
  info: string;
}

const mockParameters: Record<string, Parameter[]> = {
  biological: [
    { name: "E. coli", value: 0, unit: "UFC/100mL", limit: 0, status: "safe", info: "Ausencia de bacterias fecales" },
    { name: "Enterococos", value: 0, unit: "UFC/100mL", limit: 0, status: "safe", info: "Sin contaminación fecal" },
    { name: "Coliformes totales", value: 2, unit: "UFC/100mL", limit: 10, status: "safe", info: "Niveles normales" },
  ],
  chemical: [
    { name: "Nitratos", value: 42, unit: "mg/L", limit: 50, status: "warning", info: "Nivel elevado - común en Bretaña por agricultura" },
    { name: "Pesticidas totales", value: 0.3, unit: "µg/L", limit: 0.5, status: "safe", info: "Dentro de límites europeos" },
    { name: "Plomo", value: 5, unit: "µg/L", limit: 10, status: "safe", info: "Niveles seguros" },
    { name: "Arsénico", value: 2, unit: "µg/L", limit: 10, status: "safe", info: "Sin riesgo para la salud" },
    { name: "Cloro residual", value: 0.4, unit: "mg/L", limit: 0.6, status: "warning", info: "Puede causar irritación del cuero cabelludo" },
  ],
  physical: [
    { name: "Dureza del agua", value: 320, unit: "mg/L CaCO₃", limit: 200, status: "danger", info: "Agua muy dura - común en Bretaña" },
    { name: "pH", value: 7.8, unit: "", limit: 8.5, status: "safe", info: "Nivel óptimo" },
    { name: "Turbidez", value: 0.5, unit: "NTU", limit: 1, status: "safe", info: "Agua clara" },
    { name: "Temperatura", value: 14, unit: "°C", limit: 25, status: "safe", info: "Normal para agua de red" },
  ],
};

export function TapWater() {
  const [location, setLocation] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleStart = () => {
    if (location.trim()) {
      setSelectedLocation(location);
      setLoadingState("loading");
      setTimeout(() => {
        setLoadingState("results");
      }, 2000);
    }
  };

  const getOverallStatus = () => {
    const allParams = [...mockParameters.biological, ...mockParameters.chemical, ...mockParameters.physical];
    const dangerCount = allParams.filter(p => p.status === "danger").length;
    const warningCount = allParams.filter(p => p.status === "warning").length;
    
    if (dangerCount > 0) return { status: "warning", text: "Agua potable con consideraciones", color: "text-yellow-400" };
    if (warningCount > 0) return { status: "caution", text: "Agua segura - posibles efectos cosméticos", color: "text-cyan-300" };
    return { status: "safe", text: "Agua totalmente segura", color: "text-green-400" };
  };

  const getRecommendations = () => {
    const recommendations = [];
    const hardness = mockParameters.physical.find(p => p.name === "Dureza del agua");
    const chlorine = mockParameters.chemical.find(p => p.name === "Cloro residual");
    const nitrates = mockParameters.chemical.find(p => p.name === "Nitratos");

    if (hardness && hardness.status === "danger") {
      recommendations.push({
        icon: "💇‍♀️",
        title: "Filtro de ducha recomendado",
        desc: "Reduce la dureza del agua para proteger piel y cabello"
      });
    }
    if (chlorine && chlorine.value > 0.3) {
      recommendations.push({
        icon: "🚿",
        title: "Ventilación después de duchas",
        desc: "El cloro puede causar irritación leve del cuero cabelludo"
      });
    }
    if (nitrates && nitrates.status === "warning") {
      recommendations.push({
        icon: "🍼",
        title: "Precaución con bebés",
        desc: "Considerar agua embotellada para preparar biberones"
      });
    }
    if (recommendations.length === 0) {
      recommendations.push({
        icon: "✅",
        title: "No se requiere acción",
        desc: "Tu agua cumple con todos los estándares de calidad"
      });
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Droplet className="w-8 h-8 text-cyan-300" />
            Calidad del Agua del Grifo
          </h1>
          <p className="text-cyan-200">Información para residentes de Bretaña</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-[#1a3a5c]/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStart()}
                placeholder="Ingresa tu ubicación en Bretaña (ej: Rennes, Brest, Saint-Malo...)"
                className="w-full pl-10 pr-4 py-3 bg-[#0a1628] border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400/60"
                disabled={loadingState === "loading"}
              />
            </div>
            {loadingState === "idle" && (
              <button
                onClick={handleStart}
                disabled={!location.trim()}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/30 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Iniciar
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loadingState === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mb-4" />
            <p className="text-cyan-200 text-lg">Analizando calidad del agua en {selectedLocation}...</p>
            <p className="text-cyan-400/60 text-sm mt-2">Obteniendo datos biológicos, químicos y físicos</p>
          </div>
        )}

        {/* Results */}
        {loadingState === "results" && (
          <div className="space-y-6">
            {/* Overall Status */}
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-1">
                    Estado General - {selectedLocation}
                  </h2>
                  <p className={`text-lg font-semibold ${getOverallStatus().color}`}>
                    {getOverallStatus().text}
                  </p>
                </div>
                <div className="text-sm text-cyan-300/70">
                  Última actualización: {new Date().toLocaleDateString('es-ES')}
                </div>
              </div>
            </div>

            {/* Biological Parameters */}
            <ParameterSection title="Parámetros Biológicos" icon="🦠" parameters={mockParameters.biological} />

            {/* Chemical Parameters */}
            <ParameterSection title="Parámetros Químicos" icon="🧪" parameters={mockParameters.chemical} />

            {/* Physical Parameters */}
            <ParameterSection title="Parámetros Físicos" icon="⚙️" parameters={mockParameters.physical} />

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">💡 Recomendaciones</h3>
              <div className="space-y-3">
                {getRecommendations().map((rec, idx) => (
                  <div key={idx} className="flex gap-3 bg-[#0a1628]/40 p-4 rounded-lg">
                    <span className="text-2xl">{rec.icon}</span>
                    <div>
                      <h4 className="text-cyan-200 font-semibold">{rec.title}</h4>
                      <p className="text-cyan-300/70 text-sm">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* French Standards Comparison */}
            <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-4">
              <p className="text-cyan-200 text-sm">
                <span className="font-semibold">📊 Comparación con estándares franceses:</span> Todos los valores mostrados se comparan con los límites establecidos por el Ministerio de Salud de Francia y directivas de la UE.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ParameterSection({ title, icon, parameters }: { title: string; icon: string; parameters: Parameter[] }) {
  const safeCount = parameters.filter(p => p.status === "safe").length;
  const warningCount = parameters.filter(p => p.status === "warning").length;
  const dangerCount = parameters.filter(p => p.status === "danger").length;
  const total = parameters.length;

  return (
    <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2">
          <span>{icon}</span>
          {title}
        </h3>
        <div className="text-sm text-cyan-300">
          {safeCount}/{total} parámetros óptimos
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-3 bg-[#0a1628] rounded-full overflow-hidden flex">
          <div 
            className="bg-green-500 transition-all duration-500"
            style={{ width: `${(safeCount / total) * 100}%` }}
          />
          <div 
            className="bg-yellow-500 transition-all duration-500"
            style={{ width: `${(warningCount / total) * 100}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${(dangerCount / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Parameters */}
      <div className="space-y-3">
        {parameters.map((param, idx) => (
          <div key={idx} className="bg-[#0a1628]/40 rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {param.status === "safe" && <CheckCircle className="w-5 h-5 text-green-400" />}
                {param.status === "warning" && <AlertTriangle className="w-5 h-5 text-yellow-400" />}
                {param.status === "danger" && <AlertCircle className="w-5 h-5 text-red-400" />}
                <span className="text-white font-semibold">{param.name}</span>
              </div>
              <div className="text-right">
                <div className="text-cyan-200 font-mono">
                  {param.value} {param.unit}
                </div>
                <div className="text-xs text-cyan-400/60">
                  Límite: {param.limit} {param.unit}
                </div>
              </div>
            </div>
            <p className="text-cyan-300/70 text-sm">{param.info}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
