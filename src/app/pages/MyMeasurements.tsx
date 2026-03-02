import { useState } from "react";
import { Search, Calendar, MapPin, Plus, Droplet, Waves, Fish, Trash2 } from "lucide-react";

interface Measurement {
  id: string;
  date: string;
  location: string;
  type: "tap" | "coastal" | "rivers";
  quality: number;
  status: "safe" | "caution" | "danger";
  notes: string;
}

const mockMeasurements: Measurement[] = [
  {
    id: "1",
    date: "2026-03-02",
    location: "Rennes, Rue de la Monnaie",
    type: "tap",
    quality: 75,
    status: "caution",
    notes: "Agua dura detectada, calcificación visible"
  },
  {
    id: "2",
    date: "2026-03-01",
    location: "Plage du Sillon, Saint-Malo",
    type: "coastal",
    quality: 95,
    status: "safe",
    notes: "Excelentes condiciones para nadar"
  },
  {
    id: "3",
    date: "2026-02-28",
    location: "Brest, Centro Ciudad",
    type: "tap",
    quality: 85,
    status: "safe",
    notes: "Calidad óptima del agua potable"
  },
  {
    id: "4",
    date: "2026-02-26",
    location: "Lago Guerlédan",
    type: "rivers",
    quality: 88,
    status: "safe",
    notes: "Agua clara y de excelente calidad"
  },
  {
    id: "5",
    date: "2026-02-24",
    location: "Grande Plage, Quiberon",
    type: "coastal",
    quality: 92,
    status: "safe",
    notes: "Perfecta para actividades acuáticas"
  },
];

export function MyMeasurements() {
  const [measurements, setMeasurements] = useState<Measurement[]>(mockMeasurements);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "tap" | "coastal" | "rivers">("all");

  const filteredMeasurements = measurements.filter(m => {
    const matchesSearch = m.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || m.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "tap": return <Droplet className="w-4 h-4 text-cyan-400" />;
      case "coastal": return <Waves className="w-4 h-4 text-blue-400" />;
      case "rivers": return <Fish className="w-4 h-4 text-teal-400" />;
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case "tap": return "Agua del Grifo";
      case "coastal": return "Agua Litoral";
      case "rivers": return "Ríos/Lagos";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "text-green-400";
      case "caution": return "text-yellow-400";
      case "danger": return "text-red-400";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "safe": return "bg-green-500/20";
      case "caution": return "bg-yellow-500/20";
      case "danger": return "bg-red-500/20";
    }
  };

  const handleDelete = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
  };

  const stats = {
    total: measurements.length,
    safe: measurements.filter(m => m.status === "safe").length,
    caution: measurements.filter(m => m.status === "caution").length,
    danger: measurements.filter(m => m.status === "danger").length,
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mis Mediciones</h1>
          <p className="text-cyan-200">Historial de análisis de calidad del agua</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-4 border border-cyan-500/30">
            <p className="text-cyan-400/70 text-sm mb-1">Total</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-xl p-4 border border-green-500/30">
            <p className="text-green-400/70 text-sm mb-1">Seguro</p>
            <p className="text-3xl font-bold text-green-400">{stats.safe}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-xl p-4 border border-yellow-500/30">
            <p className="text-yellow-400/70 text-sm mb-1">Precaución</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.caution}</p>
          </div>
          <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-xl p-4 border border-red-500/30">
            <p className="text-red-400/70 text-sm mb-1">Peligro</p>
            <p className="text-3xl font-bold text-red-400">{stats.danger}</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-[#1a3a5c]/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por ubicación..."
                className="w-full pl-10 pr-4 py-2 bg-[#0a1628] border border-cyan-500/30 rounded-lg text-white placeholder-cyan-400/40 focus:outline-none focus:border-cyan-400/60"
              />
            </div>
            
            <div className="flex gap-2">
              <FilterBtn active={filterType === "all"} onClick={() => setFilterType("all")} label="Todos" />
              <FilterBtn active={filterType === "tap"} onClick={() => setFilterType("tap")} label="Grifo" />
              <FilterBtn active={filterType === "coastal"} onClick={() => setFilterType("coastal")} label="Playa" />
              <FilterBtn active={filterType === "rivers"} onClick={() => setFilterType("rivers")} label="Ríos" />
            </div>
          </div>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors">
            <Plus className="w-5 h-5" />
            <span>Agregar Nueva Medición</span>
          </button>
        </div>

        {/* Measurements List */}
        <div className="space-y-4">
          {filteredMeasurements.length === 0 ? (
            <div className="text-center py-12 bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl border border-cyan-500/30">
              <p className="text-cyan-300/70 text-lg">No se encontraron mediciones</p>
            </div>
          ) : (
            filteredMeasurements.map((measurement) => (
              <div
                key={measurement.id}
                className="bg-gradient-to-br from-[#1a3a5c] to-[#0d2847] rounded-xl p-5 border border-cyan-500/30 hover:border-cyan-400/50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Date and Location */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${getStatusBg(measurement.status)}`}>
                        {getTypeIcon(measurement.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg mb-1">{measurement.location}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-cyan-300/70">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(measurement.date).toLocaleDateString('es-ES', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span>{getTypeName(measurement.type)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {measurement.notes && (
                      <p className="text-cyan-200/80 text-sm pl-12">{measurement.notes}</p>
                    )}
                  </div>

                  {/* Quality Score */}
                  <div className="flex items-center gap-4 md:pl-4 md:border-l md:border-cyan-500/20">
                    <div className="text-center">
                      <p className="text-cyan-400/70 text-xs mb-1">Calidad</p>
                      <p className={`text-3xl font-bold ${getStatusColor(measurement.status)}`}>
                        {measurement.quality}%
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusBg(measurement.status)} ${getStatusColor(measurement.status)}`}>
                        {measurement.status === "safe" && "✅ Seguro"}
                        {measurement.status === "caution" && "⚠️ Precaución"}
                        {measurement.status === "danger" && "❌ Peligro"}
                      </span>
                      <button
                        onClick={() => handleDelete(measurement.id)}
                        className="flex items-center justify-center gap-1 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-1.5 bg-[#0a1628] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      measurement.status === "safe" ? "bg-green-500" :
                      measurement.status === "caution" ? "bg-yellow-500" :
                      "bg-red-500"
                    }`}
                    style={{ width: `${measurement.quality}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBtn({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
        active
          ? "bg-cyan-500 text-white"
          : "bg-[#0a1628] text-cyan-400/70 hover:text-cyan-300 border border-cyan-500/30"
      }`}
    >
      {label}
    </button>
  );
}
