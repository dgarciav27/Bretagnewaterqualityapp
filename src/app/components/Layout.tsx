import { Outlet, Link, useLocation } from "react-router";
import { Droplet, Map, ClipboardList, Home } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  if (isLanding) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#1a3a5c]">
      <nav className="bg-[#0a1628]/80 backdrop-blur-sm border-b border-cyan-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors">
              <Droplet className="w-6 h-6" />
              <span className="font-semibold">Bretagne Water Quality</span>
            </Link>
            <div className="flex gap-1">
              <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Inicio" />
              <NavLink to="/map" icon={<Map className="w-4 h-4" />} label="Mapa" />
              <NavLink to="/my-measurements" icon={<ClipboardList className="w-4 h-4" />} label="Mis Mediciones" />
            </div>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function NavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-cyan-500/20 text-cyan-300"
          : "text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10"
      }`}
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}
