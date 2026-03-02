import { useState } from "react";
import { Search, Waves, CheckCircle, AlertTriangle, XCircle, TrendingUp, TrendingDown, Minus, Cloud, Loader2 } from "lucide-react";

type LoadingState = "idle" | "loading" | "results";
type WaterStatus = "safe" | "caution" | "danger";
type Trend = "improving" | "stable" | "deteriorating";

interface BeachData {
  name: string;
  status: WaterStatus;
  eColi: number;
  enterococci: number;
  lastMeasurement: string;
  trend: Trend;
  rainfall: boolean;
  prediction: string;
}

const mockBeaches: Record<string, BeachData> = {
  "Saint-Malo": {
    name: "Plage du Sillon, Saint-Malo",
    status: "safe",
    eColi: 180,
    enterococci: 45,
    lastMeasurement: "2026-03-01",
    trend: "stable",
    rainfall: false,
    prediction: "Condiciones excelentes esperadas para los próximos 3 días"
  },
  "Brest": {
    name: "Plage du Moulin Blanc, Brest",
    status: "caution",
    eColi: 420,
    enterococci: 180,
    lastMeasurement: "2026-02-28",
    trend: "deteriorating",
    rainfall: true,
    prediction: "Mejora esperada en 48h si cesa la lluvia"
  },
  "Quiberon": {
    name: "Grande Plage, Quiberon",
    status: "safe",
    eColi: 120,
    enterococci: 30,
    lastMeasurement: "2026-03-02",
    trend: "improving",
    rainfall: false,
    prediction: "Excelente calidad mantenida para el fin de semana"
  },
  "Dinard": {
    name: "Plage de l'Écluse, Dinard",
    status: "danger",
    eColi: 850,
    enterococci: 320,
    lastMeasurement: "2026-03-01",
    trend: "deteriorating",
    rainfall: true,
    prediction: "No recomendado nadar hasta nueva medición"
  }
};

export function BeachWater() {
  const [location, setLocation] = useState("");
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const [beachData, setBeachData] = useState<BeachData | null>(null);

  const handleSearch = () => {
    if (location.trim()) {
      setLoadingState("loading");
      setTimeout(() => {
        const beach = Object.entries(mockBeaches).find(([key]) => 
          key.toLowerCase().includes(location.toLowerCase())
        );
        setBeachData(beach ? beach[1] : mockBeaches["Saint-Malo"]);
        setLoadingState("results");
      }, 1500);
    }
  };

  const getStatusConfig = (status: WaterStatus) => {
    switch (status) {
      case "safe":
        return {
          icon: <CheckCircle className="w-12 h-12" />,
          color: "text-green-400",
          bgColor: "from-green-500/20 to-green-500/5",
          borderColor: "border-green-500/40",
          text: "✅ Seguro para nadar",
          description: "La calidad del agua cumple con todos los estándares sanitarios"
        };
      case "caution":
        return {
          icon: <AlertTriangle className="w-12 h-12" />,
          color: "text-yellow-400",
          bgColor: "from-yellow-500/20 to-yellow-500/5",
          borderColor: "border-yellow-500/40",
          text: "⚠️ Precaución",
          description: "Calidad aceptable pero considerar evitar si tienes sistema inmune débil"
        };
      case "danger":
        return {
          icon: <XCircle className="w-12 h-12" />,
          color: "text-red-400",
          bgColor: "from-red-500/20 to-red-500/5",
          borderColor: "border-red-500/40",
          text: "❌ No recomendado",
          description: "Evitar el baño - niveles bacterianos por encima de límites seguros"
        };
    }
  };

  const getTrendIcon = (trend: Trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case "stable":
        return <Minus className="w-5 h-5 text-cyan-400" />;
      case "deteriorating":
        return <TrendingDown className="w-5 h-5 text-red-400" />;
    }
  };

  const getTrendText = (trend: Trend) => {
    switch (trend) {
      case "improving":
        return "Mejorando";
      case "stable":
        return "Estable";
      case "deteriorating":
        return "Deteriorándose";
    }
  };

  const getEColiStatus = (value: number) => {
    if (value < 250) return { status: "safe", text: "Excelente" };
    if (value < 500) return { status: "caution", text: "Aceptable" };
    return { status: "danger", text: "Alto" };
  };

  const getEnterococciStatus = (value: number) => {
    if (value < 100) return { status: "safe", text: "Excelente" };
    if (value < 200) return { status: "caution", text: "Aceptable" };
    return { status: "danger", text: "Alto" };
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
            <Waves className="w-8 h-8 text-cyan-300" />
            Calidad del Agua de Playa
          </h1>
          <p className="text-cyan-200">Información para bañistas en Bretaña</p>
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
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Buscar playa en Bretaña (ej: Saint-Malo, Brest, Quiberon...)"
                className="w-full pl-10 pr-4 py-3 bg-[#0a1628] border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400/60"
                disabled={loadingState === "loading"}
              />
            </div>
            {loadingState === "idle" && (
              <button
                onClick={handleSearch}
                disabled={!location.trim()}
                className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-500/30 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Buscar
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loadingState === "loading" && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-cyan-400 animate-spin mb-4" />
            <p className="text-cyan-200 text-lg">Verificando calidad del agua...</p>
          </div>
        )}

        {/* Results */}
        {loadingState === "results" && beachData && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className={`bg-gradient-to-br ${getStatusConfig(beachData.status).bgColor} rounded-xl p-8 border-2 ${getStatusConfig(beachData.status).borderColor}`}>
              <div className="flex items-start gap-6">
                <div className={getStatusConfig(beachData.status).color}>
                  {getStatusConfig(beachData.status).icon}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {beachData.name}
                  </h2>
                  <p className={`text-xl font-semibold mb-2 ${getStatusConfig(beachData.status).color}`}>
                    {getStatusConfig(beachData.status).text}
                  </p>
                  <p className="text-cyan-200/90">
                    {getStatusConfig(beachData.status).description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bacterial Levels */}
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
              <h3 className="text-xl font-semibold text-white mb-4">🦠 Niveles Bacterianos</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#0a1628]/40 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-200 font-semibold">E. coli</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      getEColiStatus(beachData.eColi).status === "safe" ? "bg-green-500/20 text-green-300" :
                      getEColiStatus(beachData.eColi).status === "caution" ? "bg-yellow-500/20 text-yellow-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {getEColiStatus(beachData.eColi).text}
                    </span>
                  </div>
                  <p className="text-2xl font-mono text-white mb-1">{beachData.eColi} UFC/100mL</p>
                  <p className="text-xs text-cyan-400/60">Límite seguro: 250 UFC/100mL</p>
                </div>

                <div className="bg-[#0a1628]/40 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-cyan-200 font-semibold">Enterococos</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      getEnterococciStatus(beachData.enterococci).status === "safe" ? "bg-green-500/20 text-green-300" :
                      getEnterococciStatus(beachData.enterococci).status === "caution" ? "bg-yellow-500/20 text-yellow-300" :
                      "bg-red-500/20 text-red-300"
                    }`}>
                      {getEnterococciStatus(beachData.enterococci).text}
                    </span>
                  </div>
                  <p className="text-2xl font-mono text-white mb-1">{beachData.enterococci} UFC/100mL</p>
                  <p className="text-xs text-cyan-400/60">Límite seguro: 100 UFC/100mL</p>
                </div>
              </div>
            </div>

            {/* Trend and Last Measurement */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">📅 Última Medición</h3>
                <p className="text-cyan-200 text-2xl font-semibold mb-1">
                  {new Date(beachData.lastMeasurement).toLocaleDateString('es-ES', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  {getTrendIcon(beachData.trend)}
                  <span className="text-cyan-300">Tendencia: {getTrendText(beachData.trend)}</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-lg font-semibold text-white mb-3">🌧️ Condiciones Meteorológicas</h3>
                {beachData.rainfall ? (
                  <div className="flex items-start gap-3">
                    <Cloud className="w-6 h-6 text-cyan-400 mt-1" />
                    <div>
                      <p className="text-yellow-300 font-semibold">Lluvia reciente detectada</p>
                      <p className="text-cyan-300/70 text-sm mt-1">
                        Las lluvias pueden aumentar temporalmente los niveles bacterianos
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                    <div>
                      <p className="text-green-300 font-semibold">Sin lluvia reciente</p>
                      <p className="text-cyan-300/70 text-sm mt-1">
                        Condiciones meteorológicas favorables
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Prediction */}
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/40 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span>🔮</span>
                Predicción a Corto Plazo
              </h3>
              <p className="text-cyan-200 text-lg">{beachData.prediction}</p>
              <p className="text-cyan-300/60 text-sm mt-2">
                * Basado en datos históricos, patrones de lluvia y mediciones recientes
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-[#1a3a5c]/40 border border-cyan-500/20 rounded-xl p-4">
              <p className="text-cyan-200/80 text-sm">
                <span className="font-semibold">ℹ️ Información:</span> Los datos se actualizan regularmente según directivas de la UE sobre calidad de aguas de baño. Las mediciones se realizan semanalmente durante la temporada de baño.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
