import { useState } from "react";
import { Search, Filter, Droplet, Waves, Fish } from "lucide-react";

type WaterType = "all" | "tap" | "coastal" | "rivers";

interface WaterPoint {
  id: string;
  name: string;
  type: "tap" | "coastal" | "rivers";
  lat: number;
  lng: number;
  status: "safe" | "caution" | "danger";
  quality: number;
}

const mockWaterPoints: WaterPoint[] = [
  { id: "1", name: "Rennes Centro", type: "tap", lat: 48.1173, lng: -1.6778, status: "caution", quality: 75 },
  { id: "2", name: "Brest Fontaine", type: "tap", lat: 48.3904, lng: -4.4861, status: "safe", quality: 85 },
  { id: "3", name: "Saint-Malo Grifo", type: "tap", lat: 48.6500, lng: -2.0260, status: "safe", quality: 90 },
  { id: "4", name: "Plage du Sillon", type: "coastal", lat: 48.6480, lng: -2.0100, status: "safe", quality: 95 },
  { id: "5", name: "Plage de Dinard", type: "coastal", lat: 48.6333, lng: -2.0667, status: "danger", quality: 45 },
  { id: "6", name: "Grande Plage Quiberon", type: "coastal", lat: 47.4833, lng: -3.1167, status: "safe", quality: 92 },
  { id: "7", name: "Plage Moulin Blanc", type: "coastal", lat: 48.3850, lng: -4.4200, status: "caution", quality: 68 },
  { id: "8", name: "Río Vilaine", type: "rivers", lat: 47.6500, lng: -2.0833, status: "caution", quality: 70 },
  { id: "9", name: "Lago Guerlédan", type: "rivers", lat: 48.2000, lng: -3.0167, status: "safe", quality: 88 },
  { id: "10", name: "Río Rance", type: "rivers", lat: 48.4500, lng: -1.9833, status: "safe", quality: 82 },
];

export function Map() {
  const [selectedType, setSelectedType] = useState<WaterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoint, setSelectedPoint] = useState<WaterPoint | null>(null);

  const filteredPoints = mockWaterPoints.filter(point => {
    const matchesType = selectedType === "all" || point.type === selectedType;
    const matchesSearch = point.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "#22c55e";
      case "caution": return "#eab308";
      case "danger": return "#ef4444";
      default: return "#06b6d4";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tap": return <Droplet className="w-4 h-4" />;
      case "coastal": return <Waves className="w-4 h-4" />;
      case "rivers": return <Fish className="w-4 h-4" />;
      default: return <Droplet className="w-4 h-4" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "tap": return "Agua del Grifo";
      case "coastal": return "Agua Litoral";
      case "rivers": return "Ríos y Lagos";
      default: return type;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mapa de Calidad del Agua</h1>
          <p className="text-cyan-200">Bretaña, Francia</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <div className="bg-[#1a3a5c]/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar ubicación..."
                  className="w-full pl-10 pr-4 py-2 bg-[#0a1628] border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400/60"
                />
              </div>

              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-cyan-400" />
                <h3 className="text-white font-semibold">Filtrar por tipo</h3>
              </div>

              <div className="space-y-2">
                <FilterButton
                  active={selectedType === "all"}
                  onClick={() => setSelectedType("all")}
                  icon={<Droplet className="w-4 h-4" />}
                  label="Todos"
                  count={mockWaterPoints.length}
                />
                <FilterButton
                  active={selectedType === "tap"}
                  onClick={() => setSelectedType("tap")}
                  icon={<Droplet className="w-4 h-4" />}
                  label="Agua del Grifo"
                  count={mockWaterPoints.filter(p => p.type === "tap").length}
                />
                <FilterButton
                  active={selectedType === "coastal"}
                  onClick={() => setSelectedType("coastal")}
                  icon={<Waves className="w-4 h-4" />}
                  label="Agua Litoral"
                  count={mockWaterPoints.filter(p => p.type === "coastal").length}
                />
                <FilterButton
                  active={selectedType === "rivers"}
                  onClick={() => setSelectedType("rivers")}
                  icon={<Fish className="w-4 h-4" />}
                  label="Ríos y Lagos"
                  count={mockWaterPoints.filter(p => p.type === "rivers").length}
                />
              </div>
            </div>

            {/* Legend */}
            <div className="bg-[#1a3a5c]/40 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20">
              <h3 className="text-white font-semibold mb-3">Leyenda</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span className="text-cyan-200">Seguro (≥80%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span className="text-cyan-200">Precaución (60-79%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span className="text-cyan-200">Peligro (&lt;60%)</span>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-cyan-500/10 border border-cyan-400/30 rounded-xl p-4">
              <p className="text-cyan-200 text-sm">
                Mostrando <span className="font-bold text-cyan-300">{filteredPoints.length}</span> ubicaciones
              </p>
            </div>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Mock Map */}
            <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl border border-cyan-500/30 overflow-hidden">
              <div className="relative h-[500px] bg-[#0a1628]">
                {/* Bretagne region outline - simplified */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
                  {/* Background */}
                  <rect width="600" height="400" fill="#0a1628" />
                  
                  {/* Simplified Bretagne coastline */}
                  <path
                    d="M 100 200 Q 150 150, 200 180 L 250 160 L 300 170 L 350 150 Q 400 140, 450 160 L 500 180 Q 520 200, 500 220 L 450 240 L 400 250 Q 350 260, 300 250 L 250 240 L 200 250 Q 150 260, 120 240 Z"
                    fill="#0d2847"
                    stroke="#1a3a5c"
                    strokeWidth="2"
                  />

                  {/* Water points */}
                  {filteredPoints.map((point) => {
                    const x = ((point.lng + 5) / 3) * 600;
                    const y = ((50 - point.lat) / 3) * 400;
                    
                    return (
                      <g key={point.id}>
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill={getStatusColor(point.status)}
                          stroke="#0a1628"
                          strokeWidth="2"
                          className="cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => setSelectedPoint(point)}
                        />
                        {selectedPoint?.id === point.id && (
                          <circle
                            cx={x}
                            cy={y}
                            r="15"
                            fill="none"
                            stroke={getStatusColor(point.status)}
                            strokeWidth="2"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Map overlay info */}
                <div className="absolute top-4 left-4 bg-[#0a1628]/90 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/30">
                  <p className="text-cyan-300 text-sm font-semibold">Región de Bretaña</p>
                  <p className="text-cyan-400/70 text-xs">Haz clic en los puntos para más información</p>
                </div>
              </div>
            </div>

            {/* Selected Point Details */}
            {selectedPoint && (
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getTypeIcon(selectedPoint.type)}
                      <span className="text-cyan-400/70 text-sm">{getTypeName(selectedPoint.type)}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{selectedPoint.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#0a1628]/40 rounded-lg p-4">
                    <p className="text-cyan-400/70 text-sm mb-1">Estado</p>
                    <p className={`text-lg font-semibold ${
                      selectedPoint.status === "safe" ? "text-green-400" :
                      selectedPoint.status === "caution" ? "text-yellow-400" :
                      "text-red-400"
                    }`}>
                      {selectedPoint.status === "safe" ? "✅ Seguro" :
                       selectedPoint.status === "caution" ? "⚠️ Precaución" :
                       "❌ Peligro"}
                    </p>
                  </div>

                  <div className="bg-[#0a1628]/40 rounded-lg p-4">
                    <p className="text-cyan-400/70 text-sm mb-1">Índice de Calidad</p>
                    <p className="text-lg font-semibold text-white">{selectedPoint.quality}%</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-2 bg-[#0a1628] rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${selectedPoint.quality}%`,
                        backgroundColor: getStatusColor(selectedPoint.status)
                      }}
                    />
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  {selectedPoint.type === "tap" && (
                    <button
                      onClick={() => window.location.href = "/tap-water"}
                      className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                    >
                      Ver Detalles
                    </button>
                  )}
                  {selectedPoint.type === "coastal" && (
                    <button
                      onClick={() => window.location.href = "/beach-water"}
                      className="flex-1 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors"
                    >
                      Ver Detalles
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Points List */}
            {!selectedPoint && (
              <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-6 border border-cyan-500/30">
                <h3 className="text-xl font-semibold text-white mb-4">Ubicaciones</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {filteredPoints.map((point) => (
                    <button
                      key={point.id}
                      onClick={() => setSelectedPoint(point)}
                      className="w-full flex items-center justify-between p-3 bg-[#0a1628]/40 hover:bg-[#0a1628]/60 rounded-lg transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: getStatusColor(point.status) }}
                        />
                        <div>
                          <p className="text-white font-semibold">{point.name}</p>
                          <p className="text-cyan-400/70 text-sm">{getTypeName(point.type)}</p>
                        </div>
                      </div>
                      <span className="text-cyan-300 text-sm">{point.quality}%</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ 
  active, 
  onClick, 
  icon, 
  label, 
  count 
}: { 
  active: boolean; 
  onClick: () => void; 
  icon: React.ReactNode; 
  label: string; 
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
        active
          ? "bg-cyan-500/30 border-2 border-cyan-400/60 text-cyan-200"
          : "bg-[#0a1628]/40 border-2 border-transparent text-cyan-300/70 hover:bg-[#0a1628]/60"
      }`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold">{label}</span>
      </div>
      <span className="text-sm bg-cyan-500/20 px-2 py-1 rounded">{count}</span>
    </button>
  );
}
